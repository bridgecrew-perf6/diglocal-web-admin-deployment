import EmberObject from '@ember/object';
import { get } from '@ember/object';

export default EmberObject.extend({
  compute({ attribute, record, updatePermissions, createPermissions }) {
    let permissions = get(record, 'isNew') ? createPermissions : updatePermissions;
    return get(permissions || {}, attribute) === true;
  }
});
