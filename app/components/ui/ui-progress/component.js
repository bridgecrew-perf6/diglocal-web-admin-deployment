import classic from 'ember-classic-decorator';
import { classNames, attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import { computed } from '@ember/object';

@classic
@attributeBindings('role', 'tabindex', 'aria-valuenow', 'aria-valuetext', 'aria-valuemax')
@classNames('progress')
class UiProgress extends Component {
  progress = 0;
  role = 'progressbar';
  tabindex = 0;
  'aria-valuemax' = 100;

  @computed('progress')
  get 'aria-valuenow'() {
    return `${this.progress} percent`;
  }

  @computed('progress')
  get 'aria-valuetext'() {
    return `${this.progress} percent`;
  }
}

export default UiProgress
