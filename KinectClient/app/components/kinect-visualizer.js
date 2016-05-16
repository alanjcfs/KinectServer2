import PIXI from 'pixi';
import PixiCanvas from 'ember-cli-pixijs/components/pixi-canvas';

export default PixiCanvas.extend({

  shapes: new PIXI.Container(),

  init() {
    this._super(arguments);
    let test = new PIXI.Graphics();
    test.position.x = 50;
    test.position.y = 60;
    test.lineStyle(1, 0xdedede);
    test.drawRect(20, 20, 150, 150);
    test.beginFill(0xff0000);
    let shapes = this.get('shapes');
    shapes.addChild(test);
  },

  draw() {
    let renderer = this.get('pixiRenderer');
    let shapes = this.get('shapes');
    renderer.render(shapes);
  }
});
