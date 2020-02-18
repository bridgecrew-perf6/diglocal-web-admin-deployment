import Transform from '@ember-data/serializer/transform';
import moment from 'moment';

export default class HHMmSsTransform extends Transform {
  deserialize(value) {
    return value ?
      moment(value).format('HH:mm:ss') :
      null;
  }

  serialize(value) {
    return value ?
      value :
      null;
  }
}
