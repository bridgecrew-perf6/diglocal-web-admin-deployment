import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedRegionListsViewController extends Controller {
  @action
  rollbackModel() {
    if (!this.model.isDeleted) {
      this.model.rollbackAttributes();
      this.model.rollbackSnapshotAttrs();
    }
  }
}
