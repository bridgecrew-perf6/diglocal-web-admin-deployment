import ApplicationSerializer from 'diglocal-manage/serializers/application';

export default class BusinessImageSerializer extends ApplicationSerializer {
  serializeAttribute(snapshot, json, key, attributes) {
    if (key === 'image') { return; }

    return super.serializeAttribute(snapshot, json, key, attributes);
  }
}
