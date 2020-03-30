import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class AuthenticatedRegionBusinessesViewUsersController extends Controller {
  @service store;
  @alias('model.business') business;

  @tracked model;
  @tracked showAddUserModal = false;
  @tracked userToAdd = null;

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
    this.showAddUserModal = false;
    this.userToAdd = null;
  })
  saveTask;

  @task(function* (user) {
    this.business.get('users').removeObject(user);
    yield this.business.save();
  })
  removeTask;

  @action
  cancel() {
    this.showAddUserModal = false;
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
