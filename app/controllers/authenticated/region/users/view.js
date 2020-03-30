import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedRegionUsersViewController extends Controller {
  @action
  rollbackModel() {
    this.model.rollbackAttributes();
  }
}
