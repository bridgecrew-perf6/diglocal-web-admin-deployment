import ApplicationSerializer from 'diglocal-manage/serializers/application';

export default class LocationSerializer extends ApplicationSerializer {
  deliveryAttrs = [
    'kickbackAvl',
    'avlRide',
    'grubhub',
    'takeoutCentral',
    'doordash',
    'uberEats',
    'postmates'
  ];

  serialize() {
    let json = super.serialize(...arguments);

    let deliveryOptions = {};

    this.deliveryAttrs.forEach((attr) => {
      deliveryOptions[attr] = json.data.attributes[`${attr}Url`] || '';
      delete json.data.attributes[`${attr}Url`];
    });

    json.data.attributes.deliveryOptions = deliveryOptions;

    return json;
  }

  normalize(typeClass, hash) {
    this.deliveryAttrs.forEach((attr) => {
      hash.attributes[`${attr}Url`] = hash.attributes.deliveryOptions[attr] || '';
    });

    delete hash.attributes.deliveryOptions;

    return super.normalize(...arguments);
  }
}
