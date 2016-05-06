import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

// hack to make these global
window.ByteBuffer = dcodeIO.ByteBuffer;
window.ProtoBuf = dcodeIO.ProtoBuf;
window.Long = dcodeIO.Long;

export default App;
