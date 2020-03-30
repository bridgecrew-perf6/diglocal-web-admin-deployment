import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedManageBusinessScoopsNewController extends Controller {
  @service router;

  @action
  afterSave(model) {
    this.router.transitionTo('authenticated.manage.business.scoops.view', model);
  }

  @action
  rollbackModel() {
    this.model.rollbackAttributes();
  }
}
