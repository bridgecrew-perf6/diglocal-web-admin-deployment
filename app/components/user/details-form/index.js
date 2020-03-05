import { not } from '@ember/object/computed';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { task } from 'ember-concurrency';

export default class DetailsForm extends Component {
  @tracked isEditing = false;
  @tracked showDestroyModal = false;

  @not('isEditing') isReadonly;

  constructor() {
    super(...arguments);
    if (isPresent(this.args.isEditing)) {
      this.isEditing = this.args.isEditing
    }
  }

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
    this.isEditing = false;
  }

  rollbackModel() {
    if (this.args.model && this.args.model.hasDirtyAttributes) {
      this.args.model.rollbackAttributes();
    }
  }

  @task(function*() {
    yield this.args.model.save();
    this.isEditing = false;
    return this.args.model;
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
    this.rollbackModel();
    this.isEditing = false;
  }

  @action
  delete() {
    return this.deleteTask.perform();
  }
}
