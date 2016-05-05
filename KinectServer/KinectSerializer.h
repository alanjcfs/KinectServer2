#pragma once

#include "KinectDevice.h"

class KinectSerializer {
 public:
    static std::string serialize(std::vector<KinectBody> bodies) {

        KBKinectBodies allBodies = KBKinectBodies();
        for (auto body = bodies.begin(); body < bodies.end(); body++) {

            KBKinectBody *shell = allBodies.add_body();
            shell->set_id(body->id);
            shell->set_timestamp(body->timestamp);
            shell->set_lefthand((KBKinectBody_KBHandState) body->leftHand);
            shell->set_righthand((KBKinectBody_KBHandState) body->rightHand);
            shell->set_lefthandconfidence((KBKinectBody_KBTrackingConfidence) body->leftHandConfidence);
            shell->set_righthandconfidence((KBKinectBody_KBTrackingConfidence) body->rightHandConfidence);

            auto clip = new KBVector4();
            clip->set_w(body->clip.w);
            clip->set_x(body->clip.x);
            clip->set_y(body->clip.y);
            clip->set_z(body->clip.z);
            shell->set_allocated_clip(clip);
            delete clip;

            for (auto i = 0; i < JointType_Count; i++) {
                KBJoint *joint = shell->add_joints();
                joint->set_type((KBJointType) body->joints[i].JointType);
                joint->set_state((KBJoint_KBTrackingState) body->joints[i].TrackingState);

                auto csp = new KBJoint_KBCameraSpacePoint();
                csp->set_x(body->joints[i].Position.X);
                csp->set_y(body->joints[i].Position.Y);
                csp->set_z(body->joints[i].Position.Z);
                joint->set_allocated_position(csp);
                delete csp;

                KBJointOrientation *orientation = shell->add_orientations();
                orientation->set_type((KBJointType) body->orientations[i].JointType);

                auto quat = new KBVector4();
                quat->set_w(body->orientations[i].Orientation.w);
                quat->set_x(body->orientations[i].Orientation.x);
                quat->set_y(body->orientations[i].Orientation.y);
                quat->set_z(body->orientations[i].Orientation.z);
                orientation->set_allocated_orientation(quat);
                delete quat;
            }
        }

        return allBodies.SerializeAsString();
    }
};
