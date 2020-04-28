import { action } from '@ember/object';
import { not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import TZ_MAPPING from 'diglocal-manage/data/time-zone-mapping';

class RegionDetailsForm extends Component {
  @service notifications;
  @tracked isEditing = false;
  @tracked canToggleEdit = true;
  @tracked showDestroyModal = false;

  @not('isEditing') isReadonly;

  get zoneOptions() {
    return Object.entries(TZ_MAPPING);
  }

  constructor() {
    super(...arguments);
    if (isPresent(this.args.isEditing)) {
      this.isEditing = this.args.isEditing;
    }
    if (isPresent(this.args.canToggleEdit)) {
      this.canToggleEdit = this.args.canToggleEdit;
    }
  }

  willDestroy() {
    this.showDestroyModal = false;
    this.isEditing = false;
    this.args.rollbackModel();
  }

  @task(function*() {
    yield this.args.model.save();
    this.isEditing = false;
    if (this.args.afterSave) {
      return this.args.afterSave(this.args.model);
    }
    this.notifications.success('Saved successfully!');
    return this.args.model;
  })
  saveTask;

  @action
  didChangeZone(event) {
    event.stopPropagation();
    this.args.model.timeZone = event.target.value;
  }

  @action
  save() {
    return this.saveTask.perform();
  }

  @action
  cancel() {
    this.args.rollbackModel();
    if (this.canToggleEdit) {
      this.isEditing = false;
    }
  }
}

export default RegionDetailsForm;
