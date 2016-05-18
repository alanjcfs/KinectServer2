import Ember from 'ember';
import PIXI from 'pixi';
import KinectBodyData from 'kinect-client/utils/kinect-body-data';

const KinectOutputBuilder = ProtoBuf.loadJson(KinectBodyData);

export default Ember.Component.extend({

  init: function({ id: { low }, joints }) {
    this._super(arguments);
    this.set('color', low);
    let jointEnums = KinectOutputBuilder.lookup('KBJointType').children.sortBy('id').mapBy('name');
    let jointData = {};
    joints.forEach(({ type, state, position }) => {
      let jointType = jointEnums[type || 0];
      jointData[jointType] = { state, x: position.x, y: position.y};
    });
    this.set('joints', jointData);
  },

  drawJoint: function(joint1, joint2) {
    let color = this.get('color');
    let joints = this.get('joints');
    let j1 = joints[joint1];
    let j2 = joints[joint2];

    // get the normal of the line so we can extend it outwards appropriately.
    let width = j2.x - j1.x;
    let height = j2.y - j1.y;
    let numerator = Math.sqrt(Math.max(height * height + width * width, 1.0));
    let normalx = - height / numerator;
    let normaly = width / numerator;
    let scale = 8; // thickness
    normalx *= scale;
    normaly *= scale;

    let joint = new PIXI.Graphics();
    joint.position.x = j1.x;
    joint.position.y = j1.y;
    return joint
      .lineStyle(1, 0xDEDEDE)
      .beginFill(color)
      .moveTo(-normalx, 0.0)
      .lineTo(0.0, normaly)
      .lineTo(width, height + normaly)
      .lineTo(width - normalx, height)
      .lineTo(-normalx, 0.0)
      .endFill();
  },

  drawHead: function() {
    let color = this.get('color');
    let joints = this.get('joints');
    return new PIXI.Graphics()
      .lineStyle(2, 0xffffff)
      .beginFill(color)
      .drawCircle(joints.HEAD.x, joints.HEAD.y, 25)
      .endFill();
  },

  drawHand: function(which) {
    let color = this.get('color');
    let joints = this.get('joints');
    let { x, y } = joints[which];
    return new PIXI.Graphics()
      .lineStyle(1, 0xffffff)
      .beginFill(color)
      .drawCircle(x, y, 8)
      .endFill();
  },

  getGraphics: function() {
    // reference: https://i-msdn.sec.s-msft.com/dynimg/IC741371.png
    let container = new PIXI.Container();
    // spine
    container.addChild(this.drawJoint('HEAD', 'NECK'));
    container.addChild(this.drawJoint('NECK', 'SPINE_SHOULDER'));
    container.addChild(this.drawJoint('SPINE_SHOULDER', 'SPINE_MID'));
    container.addChild(this.drawJoint('SPINE_MID', 'SPINE_BASE'));
    // shoulders
    container.addChild(this.drawJoint('SHOULDER_LEFT', 'SPINE_SHOULDER'));
    container.addChild(this.drawJoint('SPINE_SHOULDER', 'SHOULDER_RIGHT'));
    // hips
    container.addChild(this.drawJoint('HIP_LEFT', 'SPINE_BASE'));
    container.addChild(this.drawJoint('SPINE_BASE', 'HIP_RIGHT'));
    // left arm
    container.addChild(this.drawJoint('SHOULDER_LEFT', 'ELBOW_LEFT'));
    container.addChild(this.drawJoint('ELBOW_LEFT', 'WRIST_LEFT'));
    container.addChild(this.drawJoint('WRIST_LEFT', 'HAND_LEFT'));
    // right arm
    container.addChild(this.drawJoint('SHOULDER_RIGHT', 'ELBOW_RIGHT'));
    container.addChild(this.drawJoint('ELBOW_RIGHT', 'WRIST_RIGHT'));
    container.addChild(this.drawJoint('WRIST_RIGHT', 'HAND_RIGHT'));
    // left leg
    container.addChild(this.drawJoint('HIP_LEFT', 'KNEE_LEFT'));
    container.addChild(this.drawJoint('KNEE_LEFT', 'ANKLE_LEFT'));
    container.addChild(this.drawJoint('ANKLE_LEFT', 'FOOT_LEFT'));
    // right leg
    container.addChild(this.drawJoint('HIP_RIGHT', 'KNEE_RIGHT'));
    container.addChild(this.drawJoint('KNEE_RIGHT', 'ANKLE_RIGHT'));
    container.addChild(this.drawJoint('ANKLE_RIGHT', 'FOOT_RIGHT'));
    // head
    container.addChild(this.drawHead());
    // hands
    container.addChild(this.drawJoint('HAND_LEFT', 'HAND_TIP_LEFT'));
    container.addChild(this.drawJoint('HAND_LEFT', 'THUMB_LEFT'));
    container.addChild(this.drawHand('HAND_LEFT'));
    container.addChild(this.drawJoint('HAND_RIGHT', 'HAND_TIP_RIGHT'));
    container.addChild(this.drawJoint('HAND_RIGHT', 'THUMB_RIGHT'));
    container.addChild(this.drawHand('HAND_RIGHT'));
    return container;
  }
});
