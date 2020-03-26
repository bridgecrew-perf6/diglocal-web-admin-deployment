import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class DetailsForm extends Component {
  @service regions;
  @service store;
  @service router;

  rollbackModel() {
    if (this.args.model && this.args.model.hasDirtyAttributes) {
      this.args.model.rollbackAttributes();
    }
  }

  willDestroy() {
    this.rollbackModel();
    super.willDestroy(...arguments);
  }

  @task(function* () {
    let created = yield this.args.model.save();
    if (this.args.afterSave) {
      return this.args.afterSave(created);
    }
    return created;
  })
  saveTask;

  @action
  save() {
    return this.saveTask.perform();
  }

  @action
  cancel() {
    this.rollbackModel();
  }
}
