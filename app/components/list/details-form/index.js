import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class DetailsForm extends Component {
  @service regions;
  @service store;
  @service router;
  @service currentUser;
  @service notifications;
  @tracked showDestroyModal;

  constructor() {
    super(...arguments);
    if (typeof this.args.model.takeSnapshot === 'function') {
      this.args.model.takeSnapshot(['items']);
    }
  }

  rollbackModel() {
    if (this.args.rollbackModel) {
      return this.args.rollbackModel();
    }
  }

  willDestroy() {
    return this.rollbackModel();
  }

  @task(function* () {
    let list= yield this.args.model.save();
    if (this.args.afterSave) {
      return this.args.afterSave(list);
    }
    this.notifications.success('Saved successfully!');
    if (typeof this.args.model.takeSnapshot === 'function') {
      this.args.model.takeSnapshot(['items']);
    }
    return list;
  })
  saveTask;

  @task(function*() {
    yield this.args.model.deleteRecord();
    yield this.args.model.save();
    this.router.transitionTo('authenticated.region.lists.index');
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

