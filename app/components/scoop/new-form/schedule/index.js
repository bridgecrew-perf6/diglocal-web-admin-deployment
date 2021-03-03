import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ScoopNewFormScheduleComponent extends Component {
  @tracked showEventFields = false;

  @action
  didChangeRecurring(value) {
    if (value === true) {
      this.showEventFields = false;
    }
  }
}
