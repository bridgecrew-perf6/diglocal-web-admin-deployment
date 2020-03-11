import classic from 'ember-classic-decorator';
import EmberObject from '@ember/object';
import { get } from '@ember/object';
import config from 'diglocal-manage/config/environment';

@classic class ApplicationPermissions extends EmberObject {
  compute({ attribute, record, updatePermissions, createPermissions }) {
    if (config.environment === 'test') { return true }
    let permissions = get(record, 'isNew') ? createPermissions : updatePermissions;
    return get(permissions || {}, attribute) === true;
  }
}

export default ApplicationPermissions;
