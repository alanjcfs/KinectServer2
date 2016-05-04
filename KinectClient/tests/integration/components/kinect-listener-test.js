import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('kinect-listener', 'Integration | Component | kinect listener', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{kinect-listener}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#kinect-listener}}
      template block text
    {{/kinect-listener}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
