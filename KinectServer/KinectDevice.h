#pragma once
#include <Kinect.h>
#include <vector>

#include "KinectBody.h"

class KinectDevice
{
public:
    KinectDevice();
    ~KinectDevice();

    bool isRunning();
    std::vector<KinectBody> capture();
private:
    IKinectSensor *sensor;
    IBodyFrameReader *frameReader;
    HRESULT isValid;
};

template<class Interface>
inline void release(Interface *&what) {
    if (what != NULL) {
        what->Release();
        what = NULL;
    }
}