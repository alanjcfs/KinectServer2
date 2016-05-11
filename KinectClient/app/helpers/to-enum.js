import Ember from 'ember';

export function toEnum([enumArray, what]) {
  return enumArray[what || 0];
}

export default Ember.Helper.helper(toEnum);
