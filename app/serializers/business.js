import ApplicationSerializer from 'diglocal-manage/serializers/application';

export default class BusinessSerializer extends ApplicationSerializer {
  serializeAttribute(snapshot, json, key, attributes) {
    if (key === 'logo') { return; }

    return super.serializeAttribute(snapshot, json, key, attributes);
  }

  deliveryAttrs = [
    'grubhub',
    'postmates',
    'kickbackAvl',
    'takeoutCentral',
    'doordash'
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
