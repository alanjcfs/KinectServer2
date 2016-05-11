import Ember from 'ember';

export function toVector([vec]) {
  if(vec.w) {
    let { x, y, z, w } = vec;
    return `[${x || 0.0}, ${y || 0.0}, ${z || 0.0} ${w || 0.0}]`;
  }
  let { x, y, z } = vec;
  return `[${x || 0.0}, ${y || 0.0}, ${z || 0.0}]`;
}

export default Ember.Helper.helper(toVector);
