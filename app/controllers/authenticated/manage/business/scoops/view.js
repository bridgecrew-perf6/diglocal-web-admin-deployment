import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedManageBusinessScoopsViewController extends Controller {
  @action
  rollbackModel() {
    this.model.rollbackAttributes();
  }
}
