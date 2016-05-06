export default {
  "package": null,
  "messages": [
    {
      "name": "KBVector4",
      "fields": [
        {
          "rule": "optional",
          "type": "float",
          "name": "x",
          "id": 1
        },
        {
          "rule": "optional",
          "type": "float",
          "name": "y",
          "id": 2
        },
        {
          "rule": "optional",
          "type": "float",
          "name": "z",
          "id": 3
        },
        {
          "rule": "optional",
          "type": "float",
          "name": "w",
          "id": 4
        }
      ]
    },
    {
      "name": "KBJoint",
      "fields": [
        {
          "rule": "optional",
          "type": "KBJointType",
          "name": "type",
          "id": 1
        },
        {
          "rule": "optional",
          "type": "KBCameraSpacePoint",
          "name": "position",
          "id": 2
        },
        {
          "rule": "optional",
          "type": "KBTrackingState",
          "name": "state",
          "id": 4
        }
      ],
      "messages": [
        {
          "name": "KBCameraSpacePoint",
          "fields": [
            {
              "rule": "optional",
              "type": "float",
              "name": "x",
              "id": 1
            },
            {
              "rule": "optional",
              "type": "float",
              "name": "y",
              "id": 2
            },
            {
              "rule": "optional",
              "type": "float",
              "name": "z",
              "id": 3
            }
          ]
        }
      ],
      "enums": [
        {
          "name": "KBTrackingState",
          "values": [
            {
              "name": "NOT_TRACKED",
              "id": 0
            },
            {
              "name": "INFERRED",
              "id": 1
            },
            {
              "name": "TRACKED",
              "id": 2
            }
          ]
        }
      ]
    },
    {
      "name": "KBJointOrientation",
      "fields": [
        {
          "rule": "optional",
          "type": "KBJointType",
          "name": "type",
          "id": 1
        },
        {
          "rule": "optional",
          "type": "KBVector4",
          "name": "orientation",
          "id": 2
        }
      ]
    },
    {
      "name": "KBKinectBody",
      "fields": [
        {
          "rule": "optional",
          "type": "uint64",
          "name": "id",
          "id": 1
        },
        {
          "rule": "optional",
          "type": "int64",
          "name": "timestamp",
          "id": 2
        },
        {
          "rule": "optional",
          "type": "KBHandState",
          "name": "leftHand",
          "id": 3
        },
        {
          "rule": "optional",
          "type": "KBHandState",
          "name": "rightHand",
          "id": 4
        },
        {
          "rule": "optional",
          "type": "KBTrackingConfidence",
          "name": "leftHandConfidence",
          "id": 5
        },
        {
          "rule": "optional",
          "type": "KBTrackingConfidence",
          "name": "rightHandConfidence",
          "id": 6
        },
        {
          "rule": "optional",
          "type": "KBVector4",
          "name": "clip",
          "id": 7
        },
        {
          "rule": "repeated",
          "type": "KBJoint",
          "name": "joints",
          "id": 8
        },
        {
          "rule": "repeated",
          "type": "KBJointOrientation",
          "name": "orientations",
          "id": 9
        }
      ],
      "enums": [
        {
          "name": "KBHandState",
          "values": [
            {
              "name": "UNKNOWN",
              "id": 0
            },
            {
              "name": "NOT_TRACKED",
              "id": 1
            },
            {
              "name": "OPEN",
              "id": 2
            },
            {
              "name": "CLOSED",
              "id": 3
            },
            {
              "name": "LASSO",
              "id": 4
            }
          ]
        },
        {
          "name": "KBTrackingConfidence",
          "values": [
            {
              "name": "LOW",
              "id": 0
            },
            {
              "name": "HIGH",
              "id": 1
            }
          ]
        }
      ]
    },
    {
      "name": "KBKinectBodies",
      "fields": [
        {
          "rule": "repeated",
          "type": "KBKinectBody",
          "name": "body",
          "id": 1
        }
      ]
    }
  ],
  "enums": [
    {
      "name": "KBJointType",
      "values": [
        {
          "name": "SPINE_BASE",
          "id": 0
        },
        {
          "name": "SPINE_MID",
          "id": 1
        },
        {
          "name": "NECK",
          "id": 2
        },
        {
          "name": "HEAD",
          "id": 3
        },
        {
          "name": "SHOULDER_LEFT",
          "id": 4
        },
        {
          "name": "ELBOW_LEFT",
          "id": 5
        },
        {
          "name": "WRIST_LEFT",
          "id": 6
        },
        {
          "name": "HAND_LEFT",
          "id": 7
        },
        {
          "name": "SHOULDER_RIGHT",
          "id": 8
        },
        {
          "name": "ELBOW_RIGHT",
          "id": 9
        },
        {
          "name": "WRIST_RIGHT",
          "id": 10
        },
        {
          "name": "HAND_RIGHT",
          "id": 11
        },
        {
          "name": "HIP_LEFT",
          "id": 12
        },
        {
          "name": "KNEE_LEFT",
          "id": 13
        },
        {
          "name": "ANKLE_LEFT",
          "id": 14
        },
        {
          "name": "FOOT_LEFT",
          "id": 15
        },
        {
          "name": "HIP_RIGHT",
          "id": 16
        },
        {
          "name": "KNEE_RIGHT",
          "id": 17
        },
        {
          "name": "ANKLE_RIGHT",
          "id": 18
        },
        {
          "name": "FOOT_RIGHT",
          "id": 19
        },
        {
          "name": "SPINE_SHOULDER",
          "id": 20
        },
        {
          "name": "HAND_TIP_LEFT",
          "id": 21
        },
        {
          "name": "THUMB_LEFT",
          "id": 22
        },
        {
          "name": "HAND_TIP_RIGHT",
          "id": 23
        },
        {
          "name": "THUMB_RIGHT",
          "id": 24
        }
      ]
    }
  ]
};
