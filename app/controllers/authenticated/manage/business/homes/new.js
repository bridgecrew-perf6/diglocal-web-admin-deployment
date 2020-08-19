import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedManageBusinessHomesNewController extends Controller {
  @service router;

  @action
  afterSave(model) {
    this.router.transitionTo('authenticated.manage.business.homes.view', model);
  }

  @action
  rollbackModel() {
    let { home } = this.model;
    home.rollbackAttributes();
  }
}

