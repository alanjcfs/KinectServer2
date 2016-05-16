import Ember from 'ember';
import PIXI from 'pixi';
import KinectBodyData from 'kinect-client/utils/kinect-body-data';

const KinectOutputBuilder = ProtoBuf.loadJson(KinectBodyData);

export default Ember.Component.extend({
  head: new PIXI.Graphics(),
  torso: new PIXI.Graphics(),
  leftHand: new PIXI.Graphics(),
  rightHand: new PIXI.Graphics(),

  init: function({ id: { low }, joints }) {
    this._super(arguments);
    this.set('color', low);
    let jointEnums = KinectOutputBuilder.lookup('KBJointType').children.sortBy('id').mapBy('name');
    let jointData = {};
    joints.forEach(({ type, state, position }) => {
      let jointType = jointEnums[type || 0];
      // TODO this is a hack -- we need to map to a better coordinate system
      let convert = (coord) => (coord * 600) + 300;
      jointData[jointType] = { state, x: convert(position.x), y: 600 - convert(position.y) };
    });
    this.set('joints', jointData);
  },

  drawHead: function() {
    let color = this.get('color');
    let head = this.get('head');
    let joints = this.get('joints');
    return head.lineStyle(2, 0xffffff)
      .beginFill(color)
      .drawCircle(joints.HEAD.x, joints.HEAD.y, 25)
      .endFill();
  },

  drawTorso: function() {
    let color = this.get('color');
    let torso = this.get('torso');
    let joints = this.get('joints');
    return torso.lineStyle(4, 0xFFFFFF)
      .beginFill(color)
      .moveTo(joints.SHOULDER_LEFT.x, joints.SHOULDER_LEFT.y)
      .lineTo(joints.SHOULDER_RIGHT.x, joints.SHOULDER_RIGHT.y)
      .lineTo(joints.HIP_RIGHT.x, joints.HIP_RIGHT.y)
      .lineTo(joints.HIP_LEFT.x, joints.HIP_LEFT.y)
      .lineTo(joints.SHOULDER_LEFT.x, joints.SHOULDER_LEFT.y)
      .endFill();
  },

  drawJoint: function(joint1, joint2) {
    let color = this.get('color');
    let joints = this.get('joints');
    let joint = new PIXI.Graphics();
    let j1 = joints[joint1];
    let j2 = joints[joint2];

    // get the normal of the line so we can extend it outwards appropriately.
    let width = j2.x - j1.x;
    let height = j2.y - j1.y;
    let numerator = Math.sqrt(Math.max(height * height + width * width, 1.0));
    let normalx = - height / numerator;
    let normaly = width / numerator;
    let scale = 8;
    normalx *= scale;
    normaly *= scale;

    joint.position.x = j1.x;
    joint.position.y = j1.y;
    return joint.lineStyle(1, 0xDEDEDE)
      .beginFill(color)
      .moveTo(-normalx, 0.0)
      .lineTo(0.0, normaly)
      .lineTo(width, height + normaly)
      .lineTo(width - normalx, height)
      .lineTo(-normalx, 0.0)
      .endFill();
  },

  drawHand: function(which) {
    let color = this.get('color');
    let hand = this.get(`${which}Hand`);
    let joints = this.get('joints');
    let { x, y } = joints[`HAND_${which.toUpperCase()}`];
    return hand.lineStyle(1, 0xffffff)
      .beginFill(color)
      .drawCircle(x, y, 5)
      .endFill();
  },

  getGraphics: function() {
    let container = new PIXI.Container();
    container.addChild(this.drawHead());
    container.addChild(this.drawTorso());
    container.addChild(this.drawHand('left'));
    container.addChild(this.drawHand('right'));
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
    // right leg
    container.addChild(this.drawJoint('HIP_RIGHT', 'KNEE_RIGHT'));
    container.addChild(this.drawJoint('KNEE_RIGHT', 'ANKLE_RIGHT'));
    return container;
  }
});

/*

  this.drawToStage = (container) => {

    this._shapesData.removeChildren();

    if(this._bodyData && this._bodyData.joints) {

      // polygon graphic for the torso
      this.torso.clear();
      this.torso.lineStyle(4, 0xFFFFFF);
      this.torso.beginFill(this._color);
      this.torso.moveTo(this._bodyData.joints.ShoulderLeft.x, this._bodyData.joints.ShoulderLeft.y);
      this.torso.lineTo(this._bodyData.joints.ShoulderRight.x, this._bodyData.joints.ShoulderRight.y);
      this.torso.lineTo(this._bodyData.joints.HipRight.x, this._bodyData.joints.HipRight.y);
      this.torso.lineTo(this._bodyData.joints.HipLeft.x, this._bodyData.joints.HipLeft.y);
      this.torso.lineTo(this._bodyData.joints.ShoulderLeft.x, this._bodyData.joints.ShoulderLeft.y);
      this.torso.endFill();
      this._shapesData.addChild(this.torso);

      // neck line
      // drawLineBetweenJoints('Head', 'Neck');

      // left arm
      drawLineBetweenJoints('ShoulderLeft', 'ElbowLeft', this.leftShoulderToElbow);
      drawLineBetweenJoints('ElbowLeft', 'WristLeft', this.leftElbowToWrist);
      drawLineBetweenJoints('WristLeft', 'HandLeft', this.leftWristToHand);

      // right arm
      drawLineBetweenJoints('ShoulderRight', 'ElbowRight', this.rightShoulderToElbow);
      drawLineBetweenJoints('ElbowRight', 'WristRight', this.rightElbowToWrist);
      drawLineBetweenJoints('WristRight', 'HandRight', this.rightWristToHand);

      // left leg
      drawLineBetweenJoints('HipLeft', 'KneeLeft', this.leftHipToKnee);
      drawLineBetweenJoints('KneeLeft', 'AnkleLeft', this.leftKneeToAnkle);

      // right leg
      drawLineBetweenJoints('HipRight', 'KneeRight', this.rightHipToKnee);
      drawLineBetweenJoints('KneeRight', 'AnkleRight', this.rightKneeToAnkle);

      this.leftHand.clear();
      this.leftHand.lineStyle(1, 0xFFFFFF);
      this.leftHand.beginFill(this._color).drawCircle(this._bodyData.joints.HandLeft.x, this._bodyData.joints.HandLeft.y, 5);
      this.leftHand.endFill();
      this._shapesData.addChild(this.leftHand);

      this.rightHand.clear();
      this.rightHand.lineStyle(1, 0xFFFFFF);
      this.rightHand.beginFill(this._color).drawCircle(this._bodyData.joints.HandRight.x, this._bodyData.joints.HandRight.y, 5);
      this.rightHand.endFill();
      this._shapesData.addChild(this.rightHand);

      this.head.clear();
      this.head.lineStyle(2, 0xFFFFFF);
      this.head.beginFill(this._color).drawCircle(this._bodyData.joints.Head.x, this._bodyData.joints.Head.y, 25);
      this.head.endFill();
      this._shapesData.addChild(this.head);
*/
