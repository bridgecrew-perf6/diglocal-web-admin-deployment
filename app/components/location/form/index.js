import { action } from '@ember/object';
import { not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';
import { task, all } from 'ember-concurrency';

export default class Form extends Component {
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
    let operatingHours = (this.args.model && this.args.model.hasMany('operatingHours').value() || []).toArray();
    operatingHours.invoke('rollbackAttributes');
  }

  @task(function*() {
    yield this.args.model.save();
    let operatingHours = (this.args.model.hasMany('operatingHours').value() || []).toArray();
    yield all(operatingHours.invoke('save'));
    this.isEditing = false;
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
    this.args.model.deleteRecord();
    this.args.model.save();
  }
}
