import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import removeFalsy from 'diglocal-manage/helpers/remove-falsy';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 500 : 0;

export default Controller.extend({
  store: service(),

  business: alias('model.business'),

  showAddUserModal: false,
  userToAdd: null,

  searchUsers: task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let filter = Object.assign({}, { search });
    filter = removeFalsy(filter);
    return this.store.query('user', { filter });
  }).restartable(),

  saveAction: task(function* () {
    // the api isn't sending back users via relationships currently...hence next line
    this.business.get('users').addObjects(this.model.users);
    this.business.get('users').addObject(this.userToAdd);
    yield this.business.save();
    set(this, 'showAddUserModal', false);
  }),

  actions: {
    cancel() {
      set(this, 'showAddUserModal', false);
      this.business.rollbackAttributes();
    },
    addUser() {
      this.saveAction.perform();
    },
    removeUser() {

    }
  }
});
