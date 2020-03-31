import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ListRow extends Component {
  @service currentUser;

  @tracked showRemoveModal = false;

  @action
  remove() {
    this.args.onRemove(this.args.model);
    this.showRemoveModal = false;
  }

  get isNotCurrentUser() {
    return this.args.model.id !== this.currentUser.user.id;
  }
}
