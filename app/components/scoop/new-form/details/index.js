import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class ScoopNewFormDetailsComponent extends Component {
  @tracked showEventFields = true;

  @action
  toggleEventFields(value) {
    this.showEventFields = value;
    if (!value) {
      this.args.model.eventDate = null;
      this.args.model.eventStartTime = null;
      this.args.model.eventEndTime = null;
    }
  }
}
