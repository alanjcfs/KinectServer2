#include <iostream>

#include "KinectServer.h"

int main(int argc, char *argv[]) {
    try {
        KinectServer server;
        server.run(8008);
    }
    catch (websocketpp::exception const &e) {
        std::cout << "Websocket exception: " << e.what() << std::endl;
    }
    catch (const std::exception &e)	{
        std::cout << "Exception: " << e.what() << std::endl;
    }
    return 0;
}
