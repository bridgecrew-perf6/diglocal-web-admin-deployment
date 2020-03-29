import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class DetailsForm extends Component {
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
    return yield this.args.model.save();
  })
  saveTask;

  @task(function*() {
    yield this.args.model.deleteRecord();
    yield this.args.model.save();
    this.router.transitionTo('authenticated.region.users.index');
  })
  deleteTask;

  @action
  save() {
    return this.saveTask.perform();
  }

  @action
  cancel() {
    return this.rollbackModel();
  }

  @action
  delete() {
    return this.deleteTask.perform();
  }
}
