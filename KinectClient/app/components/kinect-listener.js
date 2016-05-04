import Ember from 'ember';

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
    console.log(`Message: ${event.data}`);
  },

  close(event) {
    console.log(`On close event has been called: ${event}`);
  }
});
