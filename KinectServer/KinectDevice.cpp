#include "KinectDevice.h"

KinectDevice::KinectDevice():
    sensor(NULL),
    frameReader(NULL),
    isValid(false),
    elapsedTime(-1)
{
    auto validate = [this](HRESULT result) { 
        this->isValid = result; 
        if (FAILED(this->isValid)) {
            throw "Initializing Kinect device failed.";
        }
    };

    IBodyFrameSource *frameSource = NULL;

    validate(GetDefaultKinectSensor(&sensor));
    validate(sensor->Open());
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
    auto kinectBodies = std::vector<KinectBody>();

    if (this->isRunning() && SUCCEEDED(result)) {
        IBody *bodies[BODY_COUNT] = { 0 };
        HRESULT getBodies = bodyFrame->GetAndRefreshBodyData(BODY_COUNT, bodies);
        if (SUCCEEDED(getBodies)) {
            INT64 time = 0;
            Vector4 clip;
            bodyFrame->get_RelativeTime(&time);
            bodyFrame->get_FloorClipPlane(&clip);

            if (this->elapsedTime == -1) {
                this->elapsedTime = time;
            }

            for (int i = 0; i < BODY_COUNT; i++) {
                IBody *body = bodies[i];
                BOOLEAN isTracked = false;
                body->get_IsTracked(&isTracked);
                if (isTracked) {
                    auto kinectBody = this->processBody(body, clip, time - elapsedTime);
                    kinectBodies.push_back(kinectBody);
                }
            }
        }

        for (int i = 0; i < BODY_COUNT; i++) {
            release(bodies[i]);
        }
    }
    release(bodyFrame);
    return kinectBodies;
}

KinectBody KinectDevice::processBody(IBody *body, Vector4 clip, INT64 timestamp) {
    KinectBody kinectBody;
    kinectBody.timestamp = timestamp;
    kinectBody.clip = clip;
    body->get_TrackingId(&kinectBody.id);
    body->get_HandLeftState(&kinectBody.leftHand);
    body->get_HandLeftConfidence(&kinectBody.leftHandConfidence);
    body->get_HandRightState(&kinectBody.rightHand);
    body->get_HandRightConfidence(&kinectBody.rightHandConfidence);
    // TODO map to depth space
    body->GetJoints(JointType_Count, kinectBody.joints);
    body->GetJointOrientations(JointType_Count, kinectBody.orientations);
    return kinectBody;
}