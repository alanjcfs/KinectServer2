#include <Kinect.h>

int main(int argc, char *argv[]) {
    // C++-14 test
    auto func = [](auto input) { return input * input; };
    
    IKinectSensor *sensor = NULL;
    GetDefaultKinectSensor(&sensor);
    return 0;
}
