#pragma once
#include <Kinect.h>
#include <vector>

#include "KinectBody.h"

typedef struct {
    uint64_t id;
    int64_t timestamp;
    HandState leftHand, rightHand;
    TrackingConfidence leftHandConfidence, rightHandConfidence;
    Vector4 clip;
    Joint joints[JointType_Count];
    JointOrientation orientations[JointType_Count];
} KinectBody;

class KinectDevice
{
public:
    KinectDevice();
    ~KinectDevice();

    bool isRunning();
    std::vector<KinectBody> capture();
private:
    KinectBody processBody(IBody *, Vector4, int64_t);
    IKinectSensor *sensor;
    IBodyFrameReader *frameReader;
    int32_t isValid;
    int64_t elapsedTime;
};

template<class Interface>
inline void release(Interface *&what) {
    if (what != NULL) {
        what->Release();
        what = NULL;
    }
}
