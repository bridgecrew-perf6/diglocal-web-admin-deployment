import Controller from '@ember/controller';
import { action } from '@ember/object'

export default class AuthenticatedNewRegionController extends Controller {
  @action
  rollbackModel() {
    this.model.rollbackAttributes();
  }
}
