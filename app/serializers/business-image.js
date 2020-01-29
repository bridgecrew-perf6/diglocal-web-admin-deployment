import classic from 'ember-classic-decorator';
import ApplicationSerializer from 'diglocal-manage/serializers/application';

@classic
export default class BusinessImage extends ApplicationSerializer {
  serializeAttribute(snapshot, json, key, attributes) {
    if (key === 'image') { return; }

    return super.serializeAttribute(snapshot, json, key, attributes);  }
}