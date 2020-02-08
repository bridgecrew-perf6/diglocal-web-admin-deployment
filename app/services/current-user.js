import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';

export default class CurrentUserService extends Service {
  @service session;
  @service('regions') regionsService;

  @tracked user;

  get isAdmin() {
    return this.userType === 'admin';
  }

  get isMultiBusinessOwner() {
    return this.userType === 'multi_owner';
  }

  get isBusinessOwner() {
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
      let businesses = this.user.hasMany('businesses').value() || [];
      if (isEmpty(businesses)) { return 'restricted'; }
      return businesses.length > 1 ? 'multi_owner' : 'single_owner';
    }
    return 'restricted';
  }
}
