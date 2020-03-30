import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import { task } from 'ember-concurrency';
import { resolve, reject } from 'rsvp';

export default class CurrentUserService extends Service {
  @service store;
  @service firebaseApp;
  @service('regions') regionsService;

  @tracked user;

  get isAdmin() {
    return this.userType === 'admin';
  }

  get isMultiBusinessOwner() {
    return this.userType === 'multi_owner';
  }

  get isSingleBusinessOwner() {
    return this.userType === 'single_owner';
  }

  get isRestricted() {
    return this.userType === 'restricted';
  }

  get canViewContent() {
    return this.user && !this.isRestricted;
  }

  get userType() {
    if (!this.user) {
      return null;
    }

    if (this.user && this.user.admin) {
      return 'admin';
    }
    if (this.user && !this.user.admin) {
      let businesses = this.user.businesses || [];
      if (isEmpty(businesses)) { return 'restricted'; }
      return businesses.length > 1 ? 'multi_owner' : 'single_owner';
    }
    return 'restricted';
  }

  load() {
    return this._load.perform();
  }

  @task(function*() {
    let currentUser = yield this.firebaseApp.auth().then(({currentUser}) =>
      currentUser ? this.store.query('user', { filter: { firebaseId: currentUser.uid}, include: 'profileImages,businesses,businesses.region' }).then(data => data.get('firstObject')) : resolve()
    );

    this.user = currentUser;

    if (this.userType && this.isRestricted) {
      return reject();
    }

    return resolve(currentUser);
  })
  _load;
}
