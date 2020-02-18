import { action } from '@ember/object';
import { not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';
import ENV from 'diglocal-manage/config/environment';

const INPUT_DEBOUNCE = ENV.environment !== 'test' ? 500 : 0;

export default class DetailsForm extends Component {
  @service regions;
  @service store;
  @tracked isEditing = false;
  @tracked showDestroyModal = false;

  @not('isEditing') isReadonly;

  constructor() {
    super(...arguments);
    if (isPresent(this.args.isEditing)) {
      this.isEditing = this.args.isEditing
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

  get activeRegionTimeZone() {
    return this.regions.activeRegion.momentTz;
  }

  @(task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let filter = Object.assign({}, { search });
    filter = removeEmpty(filter);
    return this.store.query('business', { filter });
  }).restartable())
  searchBusinesses;

  @action
  save() {
    this.args.model.save();
    this.isEditing = false;
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
    this.router.transitionTo('authenticated.region.businesses');
  }

  @action
  didChangeEventDate(range, formatted) {
    this.args.model.eventStart = formatted;
  }

  @action
  didUpdateTime(attr, range, formatted) {
    this.args.model[attr] = formatted;
  }
}
