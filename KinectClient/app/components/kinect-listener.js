import Ember from 'ember';
import KinectBodyData from 'kinect-client/utils/kinect-body-data';

const KinectOutput = ProtoBuf.loadJson(KinectBodyData).build('KinectBodies');

export default Ember.Component.extend({

  socketService: Ember.inject.service('websockets'),
  socket: null,

  willRender() {
    const socket = this.get('socketService').socketFor('ws://localhost:8008/');

    socket.on('open', this.open, this);
    socket.on('message', this.message, this);
    socket.on('close', this.close, this);

    this.set('socket', socket);
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
    let result = KinectOutput.decode(event.data);
    console.log(`Message: ${result}`);
  },

  close(event) {
    console.log(`On close event has been called: ${event}`);
  }
});
