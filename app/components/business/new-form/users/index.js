import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import config from 'diglocal-manage/config/environment';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 500 : 0;

export default class BusinessNewFormUsersComponent extends Component {
  @service store;

  @tracked userToAdd;

  @(task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let filter = Object.assign({}, { search });
    filter = removeEmpty(filter);
    return this.store.query('user', { filter });
  }).restartable())
  searchUsers;

  @action
  removeUser(user) {
    this.args.model.users.removeObject(user);
  }

  @action
  addUser() {
    this.args.model.users.addObject(this.userToAdd);
    this.userToAdd = null;
  }
}
