import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

class DetailsForm extends Component {
  @service router;
  @service notifications;

  @tracked showDestroyModal = false;

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
  }

  rollbackModel() {
    if (this.args.rollbackModel) {
      return this.args.rollbackModel();
    }
  }

  @task(function*() {
    yield this.args.model.save();
    if (this.args.afterSave) {
      return this.args.afterSave(this.args.model);
    }
    this.notifications.success('Saved successfully!');
    return this.args.model;
  })
  saveTask;

  @task(function*() {
    yield this.args.model.deleteRecord();
    yield this.args.model.save();
    this.router.transitionTo('authenticated.region.site-settings.categories.index');
  })
  deleteTask;

  @action
  save() {
    return this.saveTask.perform();
  }

  @action
  cancel() {
    this.rollbackModel();
  }

  @action
  delete() {
    return this.deleteTask.perform();
  }
}

export default DetailsForm;
