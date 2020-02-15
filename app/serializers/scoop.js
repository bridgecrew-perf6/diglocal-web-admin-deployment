import ApplicationSerializer from 'diglocal-manage/serializers/application';

export default class ScoopSerializer extends ApplicationSerializer {
  serializeAttribute(snapshot, json, key, attributes) {
    if (key === 'image') { return; }

    return super.serializeAttribute(snapshot, json, key, attributes);
  }
}
