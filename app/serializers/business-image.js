import ApplicationSerializer from 'diglocal-manage/serializers/application';

export default ApplicationSerializer.extend({
  serializeAttribute(snapshot, json, key, attributes) {
    if (key === 'image') { return; }

    return this._super(snapshot, json, key, attributes);  }
});