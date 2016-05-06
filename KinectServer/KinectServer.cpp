#include "KinectServer.h"
#include "KinectSerializer.h"

using websocketpp::lib::bind;
using websocketpp::lib::placeholders::_1;
using websocketpp::lib::placeholders::_2;

KinectServer::KinectServer()
{
    device = new KinectDevice();
    server.init_asio();
    server.set_open_handler(bind(&KinectServer::on_open, this, ::_1));
    server.set_close_handler(bind(&KinectServer::on_close, this, ::_1));
    // disable websocket logging
    server.clear_access_channels(websocketpp::log::alevel::all);
}

KinectServer::~KinectServer()
{
}

void KinectServer::on_open(connection handle) {
    lock_guard<mutex> guard(action_lock);
    actions.push(action(SUBSCRIBE, handle));
    user_changed.notify_one();
}

void KinectServer::on_close(connection handle) {
    lock_guard<mutex> guard(action_lock);
    actions.push(action(UNSUBSCRIBE, handle));
    user_changed.notify_one();
}

void KinectServer::run(uint16_t port) {
    server.listen(port);
    server.start_accept();

    thread users_thread(bind(&KinectServer::process_users, this));
    thread data_thread(bind(&KinectServer::process_data, this));

    server.run();
    users_thread.join();
    data_thread.join();
}

void KinectServer::process_users() {
    unique_lock<mutex> lock(action_lock);

    while (actions.empty()) {
        user_changed.wait(lock);
    }

    action new_action = actions.front();
    actions.pop();
    lock.unlock();

    lock_guard<mutex> guard(connection_lock);
    switch (new_action.what) {
    case SUBSCRIBE:
        connections.insert(new_action.handle);
        break;
    case UNSUBSCRIBE:
        connections.erase(new_action.handle);
        break;
    }
}

void KinectServer::process_data() {
    while (device->isRunning()) {
        auto bodies = device->capture();

        if (bodies.empty()) {
            continue;
        }

        std::string serialized = KinectSerializer::serialize(bodies);
        lock_guard<mutex> guard(connection_lock);
        for (auto it = connections.begin(); it != connections.end(); ++it) {
            server.send(*it, serialized, websocketpp::frame::opcode::text);
        }
    }
}
