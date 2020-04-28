import ApplicationSerializer from 'diglocal-manage/serializers/application';

export default class ListSerializer extends ApplicationSerializer {
  serializeBelongsTo(snapshot, json, relationship) {
    if (relationship.key === 'user') { return; }
    
    return super.serializeBelongsTo(snapshot, json, relationship);
  }


  serializeAttribute(snapshot, json, key, attributes) {
    if (key === 'heroImage') {
      return;
    }

    return super.serializeAttribute(snapshot, json, key, attributes);
  }
}
