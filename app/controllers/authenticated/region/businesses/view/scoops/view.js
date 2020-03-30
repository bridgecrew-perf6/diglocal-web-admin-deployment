import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedRegionBusinessesViewScoopsViewController extends Controller {
  @action
  rollbackModel() {
    this.model.rollbackAttributes();
  }
}
