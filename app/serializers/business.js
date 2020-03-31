import ApplicationSerializer from 'diglocal-manage/serializers/application';
import { inject as service } from '@ember/service';

export default class BusinessSerializer extends ApplicationSerializer {
  @service currentUser;

  serializeAttribute(snapshot, json, key, attributes) {
    if (key === 'logo') { return; }

    return super.serializeAttribute(snapshot, json, key, attributes);
  }

  serializeBelongsTo(snapshot, json, relationship) {
    if (!this.currentUser.isAdmin && relationship.key === 'region') {
      return;
    }
    
    return super.serializeBelongsTo(snapshot, json, relationship);
  }
}
