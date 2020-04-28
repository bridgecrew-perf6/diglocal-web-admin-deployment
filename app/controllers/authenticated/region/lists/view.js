import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedRegionListsViewController extends Controller {
  @action
  rollbackModel() {
    this.model.rollbackAttributes();
    this.model.rollbackSnapshotAttrs();
  }
}
