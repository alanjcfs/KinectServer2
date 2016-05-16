import Ember from 'ember';
import KinectBodyData from 'kinect-client/utils/kinect-body-data';

const KinectOutputBuilder = ProtoBuf.loadJson(KinectBodyData);

export default Ember.Component.extend({
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
  }
});
