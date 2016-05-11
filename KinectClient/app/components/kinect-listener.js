import Ember from 'ember';
import KinectBodyData from 'kinect-client/utils/kinect-body-data';

const KinectOutputBuilder = ProtoBuf.loadJson(KinectBodyData);
const KinectOutput = KinectOutputBuilder.build('KBKinectBodies');

export default Ember.Component.extend({

  socketService: Ember.inject.service('websockets'),
  socket: null,

  willRender() {
    const socket = this.get('socketService').socketFor('ws://10.0.0.170:8008/');

    socket.on('open', this.open, this);
    socket.on('message', this.message, this);
    socket.on('close', this.close, this);

    this.set('socket', socket);

    // set up enum lookups
    const toArray = (what) => KinectOutputBuilder.lookup(what).children.sortBy('id').mapBy('name');
    const JointType = toArray('KBJointType');
    const HandState = toArray('KBKinectBody.KBHandState');
    const TrackingState = toArray('KBJoint.KBTrackingState');
    const TrackingConfidence = toArray('KBKinectBody.KBTrackingConfidence');
    this.set('JointType', JointType);
    this.set('HandState', HandState);
    this.set('TrackingState', TrackingState);
    this.set('TrackingConfidence', TrackingConfidence);
  },

  willDestroyElement() {
    const socket = this.get('socket');

    socket.off('open', this.open);
    socket.off('message', this.message);
    socket.off('close', this.close);
  },

  open(event) {
    console.log(`On open event has been called: ${event}`);
  },

  message(event) {
    let blob = event.data;
    let fr = new FileReader();
    fr.onload = (e) => {
      let buffer = new Uint8Array(e.target.result);
      let result = KinectOutput.decode(buffer);
      this.set('result', result);
    };
    fr.readAsArrayBuffer(blob);
  },

  close(event) {
    console.log(`On close event has been called: ${event}`);
  }
});
