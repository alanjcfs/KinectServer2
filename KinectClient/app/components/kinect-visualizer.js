import Ember from 'ember';
import PIXI from 'pixi';
import PixiCanvas from 'ember-cli-pixijs/components/pixi-canvas';
import KinectVisualizerBody from './kinect-visualizer-body';

export default PixiCanvas.extend({
  pixiContainer: new PIXI.Container(),

  draw() {
    let renderer = this.get('pixiRenderer');
    let container = this.get('pixiContainer');
    let bodies = this.get('bodies.body');
    if (Ember.isEmpty(bodies)) {
      return;
    }

    // construct a new body every time. this is woefully inefficient,
    // but then again, this is only for demo purposes.
    bodies.forEach(({ id, joints }) => {
      let body = new KinectVisualizerBody({ id, joints });
      let child = body.getGraphics();
      container.addChild(child);
    });

    renderer.backgroundColor = 0x222222;
    renderer.render(container);
    container.removeChildren();
  }
});
