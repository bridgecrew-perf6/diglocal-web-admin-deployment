import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedManageBusinessScoopsNewRoute extends Route {
  @service regions;

  model() {
    return this.store.createRecord('scoop', { business: this.regions.activeBusiness });
  }
}
