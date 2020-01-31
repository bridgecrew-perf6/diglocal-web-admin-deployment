import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class ListRow extends Component {
  isRemovable = true;
  showRemoveModal = false;
  onRemove() {}

  @action
  remove() {
    this.onRemove(this.args.model);
    this.set('showRemoveModal', false);
  }
}
