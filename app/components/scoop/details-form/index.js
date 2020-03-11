import { action } from '@ember/object';
import { not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { isPresent, isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';
import config from 'diglocal-manage/config/environment';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class DetailsForm extends Component {
  @service regions;
  @service store;
  @service router;

  @tracked isEditing = false;
  @tracked showDestroyModal = false;
  @tracked showEventFields = true;
  @tracked showUploadModal = false;

  @not('isEditing') isReadonly;

  constructor() {
    super(...arguments);
    if (isPresent(this.args.isEditing)) {
      this.isEditing = this.args.isEditing
    }
    if (isBlank(this.args.model.eventDate)) {
      this.showEventFields = false;
    }
  }

  rollbackModel() {
    if (this.args.model && this.args.model.hasDirtyAttributes) {
      this.args.model.rollbackAttributes();
    }
  }

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
    this.isEditing = false;
    super.willDestroy(...arguments);
  }

  @(task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let filter = Object.assign({}, { search });
    filter = removeEmpty(filter);
    return this.store.query('business', { filter });
  }).restartable())
  searchBusinesses;

  @task(function*() {
    yield this.args.model.reload();
    this.showUploadModal = false;
    this.router.transitionTo('authenticated.region.businesses.view.scoops.view', this.args.model.id);
  })
  onUploadImageComplete;

  @task(function*() {
    let created = yield this.args.model.save();
    this.isEditing = false;
    if (this.args.afterSave) {
      return this.args.afterSave(created);
    }
    return created;
  })
  saveTask;

  @task(function*() {
    yield this.args.model.deleteRecord();
    yield this.args.model.save();
    this.router.transitionTo('authenticated.region.businesses.view.scoops.index');
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

  @action
  toggleEventFields(value) {
    this.showEventFields = value;
    if (!value) {
      this.args.model.eventDate = null;
      this.args.model.eventStartTime = null;
      this.args.model.eventEndTime = null;
    }
  }

  @action
  cancelUpload() {
    this.showUploadModal = false;
  }
}
