#include <iostream>

#include "KinectDevice.h"

KinectDevice::KinectDevice():
    sensor(NULL),
    frameReader(NULL),
    isValid(false)
{
    auto validate = [this](HRESULT result) { 
        this->isValid = result; 
        if (FAILED(this->isValid)) {
            throw "Initializing Kinect device failed.";
        }
    };

    GetDefaultKinectSensor(&sensor);
    validate(sensor->Open());

    IBodyFrameSource *frameSource = NULL;
    validate(sensor->get_BodyFrameSource(&frameSource));
    validate(frameSource->OpenReader(&this->frameReader));
    release(frameSource);
}

KinectDevice::~KinectDevice()
{
    release(sensor);
}

bool KinectDevice::isRunning() {
    return SUCCEEDED(this->isValid);
}

std::vector<KinectBody> KinectDevice::capture() {
    IBodyFrame *bodyFrame = NULL;
    HRESULT result = frameReader->AcquireLatestFrame(&bodyFrame);

    if (SUCCEEDED(result)) {
        IBody *bodies[BODY_COUNT] = { 0 };
        INT64 time = 0;

        std::cout << "time was " << bodyFrame->get_RelativeTime(&time) << std::endl;

        HRESULT hr = bodyFrame->GetAndRefreshBodyData(_countof(bodies), bodies);

        IBody *temp = bodies[0];
        BOOLEAN test = false;
        temp->get_IsTracked(&test);
        std::cout << test << std::endl;
    }
    release(bodyFrame);
    return std::vector<KinectBody>();
}