#pragma once
#include <Kinect.h>
#include <vector>

typedef struct {
    UINT64 id;
    INT64 timestamp;
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
    KinectBody processBody(IBody *, Vector4, INT64);
    IKinectSensor *sensor;
    IBodyFrameReader *frameReader;
    HRESULT isValid;
    INT64 elapsedTime;
};

template<class Interface>
inline void release(Interface *&what) {
    if (what != NULL) {
        what->Release();
        what = NULL;
    }
}