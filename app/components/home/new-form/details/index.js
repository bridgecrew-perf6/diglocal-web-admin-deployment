import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';

export default class HomeNewFormDetailsComponent extends Component {
  @tracked showEventFields = false;

  @action
  toggleEventFields(value) {
    this.showEventFields = value;
    if (!value) {
      this.args.model.eventDate = null;
      this.args.model.eventStartTime = null;
      this.args.model.eventEndTime = null;
    }
  }

  @task(function*() {
    return yield this.args.model.reload();
  })
  onAllFilesUploadComplete;
}
