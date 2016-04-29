#include <iostream>
#include <vector>

#include "KinectDevice.h"
#include "KinectBody.h"

int main(int argc, char *argv[]) {
    KinectDevice *device = new KinectDevice();
    while (device->isRunning()) {

        std::vector<KinectBody> bodies = device->capture();

        // iterate over bodies
        // print out ... 

    }
    return 0;
}
