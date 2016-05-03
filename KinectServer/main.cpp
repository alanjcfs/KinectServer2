#include <iostream>
#include <vector>

#define _WEBSOCKETPP_NOEXCEPT_TOKEN_ noexcept
#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>

#include "KinectDevice.h"

typedef websocketpp::server<websocketpp::config::asio> server;

void on_message(websocketpp::connection_hdl hdl, server::message_ptr msg) {
	std::cout << msg->get_payload() << std::endl;
}

int main(int argc, char *argv[]) {
    KinectDevice *device = new KinectDevice();
    while (device->isRunning()) {
        std::vector<KinectBody> bodies = device->capture();
        for (auto body = bodies.begin(); body < bodies.end(); body++) {
            std::cout << (*body).timestamp << std::endl;
        }
    }
    return 0;
}
