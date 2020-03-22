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

  normalizeResponse(store, primaryModelClass, payload) {
    this.deliveryAttrs.forEach((attr) => {
      payload.data.attributes[`${attr}Url`] = payload.data.attributes.deliveryOptions[attr] || '';
    });

    delete payload.data.attributes.deliveryOptions;

    return super.normalizeResponse(...arguments);
  }
}
