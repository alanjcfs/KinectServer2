#pragma once

#include <set>

#define _WEBSOCKETPP_NOEXCEPT_TOKEN_ noexcept
#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/common/thread.hpp>
#include <websocketpp/server.hpp>

#include "KinectDevice.h"

typedef websocketpp::connection_hdl connection;
typedef websocketpp::server<websocketpp::config::asio> websocket_server;
typedef std::set<connection, std::owner_less<connection> > connection_list;

typedef enum { SUBSCRIBE, UNSUBSCRIBE } message;

struct action {
action(message m, connection c) : what(m), handle(c) {}
    message what;
    connection handle;
};

using websocketpp::lib::condition_variable;
using websocketpp::lib::unique_lock;
using websocketpp::lib::lock_guard;
using websocketpp::lib::mutex;
using websocketpp::lib::thread;

class KinectServer {
 public:
    KinectServer();
    ~KinectServer();
    void on_open(connection handle);
    void on_close(connection handle);
    void run(uint16_t port);
    void process_users();
    void process_data();
 private:
    KinectDevice *device;
    websocket_server server;
    connection_list connections;
    condition_variable user_changed;
    mutex action_lock, connection_lock;
    std::queue<action> actions;
};
