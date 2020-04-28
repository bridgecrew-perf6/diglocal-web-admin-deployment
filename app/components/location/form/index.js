import { action } from '@ember/object';
import { not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';
import { task, all } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class Form extends Component {
  @service currentUser;
  @service notifications;

  @tracked isEditing = false;
  @tracked showDestroyModal = false;

  @not('isEditing') isReadonly;

  constructor() {
    super(...arguments);
    if (isPresent(this.args.isEditing)) {
      this.isEditing = this.args.isEditing
    }
    if (this.args.model.isNew) {
      this.isEditing = true;
    }
    if (typeof this.args.model.takeSnapshot === 'function') {
      this.args.model.takeSnapshot(['operatingHours', 'deliveryOptions']);
    }
  }

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
    this.isEditing = false;
  }

  rollbackModel() {
    if (this.args.rollbackModel) {
      return this.args.rollbackModel();
    }
  }

  @task(function*() {
    yield this.args.model.save();
    let operatingHours = (this.args.model.hasMany('operatingHours').value() || []).toArray();
    yield all(operatingHours.invoke('save'));
    this.isEditing = false;
    this.notifications.success('Saved successfully!');
    if (typeof this.args.model.takeSnapshot === 'function') {
      this.args.model.takeSnapshot(['operatingHours', 'deliveryOptions']);
    }
    return this.args.model;
  })
  saveTask;

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
    this.args.delete();
    this.showDestroyModal = false;
  }
}
