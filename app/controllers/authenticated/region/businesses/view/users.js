import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 500 : 0;

@classic
export default class UsersController extends Controller {
  @service store;
  @alias('model.business') business;

  showAddUserModal = false;
  userToAdd = null;

  @(task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let filter = Object.assign({}, { search });
    filter = removeEmpty(filter);
    return this.store.query('user', { filter });
  }).restartable())
  searchUsers;

  @task(function* () {
    this.business.get('users').addObject(this.userToAdd);
    yield this.business.save();
    set(this, 'showAddUserModal', false);
    set(this, 'userToAdd', null);
  })
  saveTask;

  @task(function* (user) {
    this.business.get('users').removeObject(user);
    yield this.business.save();
  })
  removeTask;

  @action
  cancel() {
    set(this, 'showAddUserModal', false);
    this.business.rollbackAttributes();
  }

  @action
  addUser() {
    this.saveTask.perform();
  }

  @action
  removeUser(user) {
    this.removeTask.perform(user);
  }
}
