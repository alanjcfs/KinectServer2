import Ember from 'ember';

export function toVector([vec]) {
  let format = (num) => {
    let n = num || 0.0;
    return n.toFixed(2);
  };

  if(!vec.x) {
    return '[empty]';
  }
  if(vec.w) {
    let { x, y, z, w } = vec;
    return `[${format(x)}, ${format(y)}, ${format(z)}, ${format(w)}]`;
  }
  let { x, y } = vec;
  return `[${format(x)}, ${format(y)}]`;
}

export default Ember.Helper.helper(toVector);
