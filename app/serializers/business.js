import ApplicationSerializer from 'diglocal-manage/serializers/application';

export default class BusinessSerializer extends ApplicationSerializer {
  serializeAttribute(snapshot, json, key, attributes) {
    if (key === 'logo') { return; }

    return super.serializeAttribute(snapshot, json, key, attributes);
  }
}
