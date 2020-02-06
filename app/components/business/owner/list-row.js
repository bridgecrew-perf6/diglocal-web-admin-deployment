import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ListRow extends Component {
  @tracked showRemoveModal = false;

  @action
  remove() {
    this.args.onRemove(this.args.model);
    this.set('showRemoveModal', false);
  }
}
