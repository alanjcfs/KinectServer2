import Ember from 'ember';
import KinectBodyData from 'kinect-client/utils/kinect-body-data';

export default Ember.Component.extend({

  socketService: Ember.inject.service('websockets'),
  socket: null,

  willRender() {
    const socket = this.get('socketService').socketFor('ws://localhost:8008/');

    socket.on('open', this.open, this);
    socket.on('message', this.message, this);
    socket.on('close', this.close, this);

    this.set('socket', socket);

    let builder = ProtoBuf.loadJson(KinectBodyData);
    let KinectOutput = builder.build('KinectBodies');
    this.set('decoder', KinectOutput);
  },

  willDestroyElement() {
    const socket = this.get('socketRef');

    socket.off('open', this.open);
    socket.off('message', this.message);
    socket.off('close', this.close);
  },

  open(event) {
    console.log(`On open event has been called: ${event}`);
  },

  message(event) {
    let decoder = this.get('decoder');
    let result = decoder.decode(event.data);
    console.log(`Message: ${result}`);
  },

  close(event) {
    console.log(`On close event has been called: ${event}`);
  }
});
