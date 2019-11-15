import Component from '@ember/component';
import layout from '../templates/components/crunchy-button';
import { oneWay } from '@ember/object/computed';

/*
  Inline usage:
    <CrunchyButton
      @task={{taskForButton}}
      @class="my-button-class"
      @value="Click Me"
    />

  Button with action:
    <CrunchyButton
      @onClick={{action "actionForButton"}}
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

export default Component.extend({
  layout,

  tagName: '',
  type: 'button',
  value: '',

  disabled: oneWay('task.isRunning'),

  task: null,
  onClick() {},

  actions: {
    click(e) {
      e.preventDefault();

      if (this.task && typeof this.task.perform === 'function') {
        this.task.perform();
      } else {
        this.onClick();
      }
    }
  }
});
