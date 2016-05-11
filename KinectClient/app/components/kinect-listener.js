import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import KinectBodyData from 'kinect-client/utils/kinect-body-data';

const KinectOutputBuilder = ProtoBuf.loadJson(KinectBodyData);
const KinectOutput = KinectOutputBuilder.build('KBKinectBodies');
const socketAddress = 'ws://10.0.0.170:8008/';

export default Ember.Component.extend({

  socketService: Ember.inject.service('websockets'),
  socket: null,

  connect: task(function* () {
    const socket = this.get('socketService').socketFor(socketAddress);

    socket.on('open', this.open, this);
    socket.on('message', this.message, this);
    socket.on('close', this.close, this);

    this.set('socket', socket);
  }).on('init'),

  reconnect: task(function* () {
    yield timeout(2500);
    this.get('socket').reconnect();
  }),

  updateData: task(function* (result) {
    this.set('result', result);
    yield timeout(1000);
  }).drop(),

  willRender() {
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

  open() {
    // no-op
  },

  message(event) {
    let blob = event.data;
    let fr = new FileReader();
    fr.onload = (e) => {
      let buffer = new Uint8Array(e.target.result);
      let result = KinectOutput.decode(buffer);
      this.get('updateData').perform(result);
    };
    fr.readAsArrayBuffer(blob);
  },

  close() {
    this.get('reconnect').perform();
  }
});
