import classic from 'ember-classic-decorator';
import EmberObject from '@ember/object';
import { get } from '@ember/object';

@classic class ApplicationPermissions extends EmberObject {
  compute({ attribute, record, updatePermissions, createPermissions }) {
    let permissions = get(record, 'isNew') ? createPermissions : updatePermissions;
    return get(permissions || {}, attribute) === true;
  }
}

export default ApplicationPermissions;
