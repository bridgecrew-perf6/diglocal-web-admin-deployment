import Transform from '@ember-data/serializer/transform';

export default class HHMmSsTransform extends Transform {
  deserialize(serialized) {
    let type = typeof serialized;

    if (type === 'string') {
      let offset = serialized.indexOf('+');

      if (offset !== -1 && serialized.length - 5 === offset) {
        offset += 3;
        return new Date(serialized.slice(0, offset) + ':' + serialized.slice(offset));
      }
      return new Date(serialized);
    } else if (type === 'number') {
      return new Date(serialized);
    } else if (serialized === null || serialized === undefined) {
      // if the value is null return null
      // if the value is not present in the data return undefined
      return serialized;
    } else {
      return null;
    }
  }

  serialize(value) {
    let regex = /([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/;
    if (value && typeof value === 'string' && value.match(regex)) {
      return value;
    }
    if (value instanceof Date && !isNaN(value)) {
       return value.toISOString();
     }
    return null;
  }
}
