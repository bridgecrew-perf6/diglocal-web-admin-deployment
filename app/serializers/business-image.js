import ApplicationSerializer from 'diglocal-manage/serializers/application';

export default class BusinessImageSerializer extends ApplicationSerializer {
  serializeAttribute(snapshot, json, key, attributes) {
    if (['image', 'sizes', 'url'].includes(key)) { return; }

    return super.serializeAttribute(snapshot, json, key, attributes);
  }
}
