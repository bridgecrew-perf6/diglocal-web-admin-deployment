import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/crunchy-modal';

@classic
@templateLayout(layout)
export default class CrunchyModal extends Component {
  onClose() {}

  @action
  close() {
    this.onClose();
  }
}
