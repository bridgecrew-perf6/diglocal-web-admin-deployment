import Component from '@ember/component';
import layout from '../templates/components/crunchy-button';
import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { readOnly } from '@ember/object/computed';
import { action } from '@ember/object';

/*
  Inline usage:
    <CrunchyButton
      @task={{taskForButton}}
      @class="my-button-class"
      @value="Click Me"
    />

  Button with action:
    <CrunchyButton
      @onClick={{this.actionForButton}}
      @class="my-button-class"
    >
      Click Me
    </CrunchyButton>

  Button with task object (ember-concurrency):
    <CrunchyButton
      @task={{taskForButton}}
      @class="my-button-class"
    >
      Click Me
    </CrunchyButton>
*/

@classic
@tagName('')
@templateLayout(layout)
export default class CrunchyButton extends Component {
  @readOnly('task.isRunning') isRunning;

  @action
  clickAction(e) {
    e.preventDefault();

    if (this.task && typeof this.task.perform === 'function') {
      this.task.perform();
    } else {
      this.onClick();
    }
  }
}
