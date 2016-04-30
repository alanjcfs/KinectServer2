#include <iostream>
#include <vector>

#include "KinectDevice.h"

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
