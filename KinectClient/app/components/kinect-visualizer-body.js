import Ember from 'ember';

// TODO track hand state (green for OPEN, blue for CLOSED, red for UNKNOWN)

export default Ember.Component.extend({
  pointer: new Pixi.Graphics(),
  torso: new Pixi.Graphics(),
  leftHand: new Pixi.Graphics(),
  rightHand: new Pixi.Graphics(),
  head: new Pixi.Graphics(),
  leftShoulderToElbow: new Pixi.Graphics(),
  leftElbowToWrist: new Pixi.Graphics(),
  leftWristToHand: new Pixi.Graphics(),
  rightShoulderToElbow: new Pixi.Graphics(),
  rightElbowToWrist: new Pixi.Graphics(),
  rightWristToHand: new Pixi.Graphics(),
  leftHipToKnee: new Pixi.Graphics(),
  leftKneeToAnkle: new Pixi.Graphics(),
  rightHipToKnee: new Pixi.Graphics(),
  rightKneeToAnkle: new Pixi.Graphics()
});
