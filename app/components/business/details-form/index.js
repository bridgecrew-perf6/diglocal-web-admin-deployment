import { inject as service } from '@ember/service';
import { not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class DetailsForm extends Component {
  @service store;
  @tracked isEditing = false;
  @tracked showDestroyModal = false;

  @not('isEditing') isReadonly;

  constructor() {
    super(...arguments);
    this.categoryOptions = [];
    this.loadCategories.perform();
    if (isPresent(this.args.isEditing)) {
      this.isEditing = this.args.isEditing
    }
  }

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
    this.isEditing = false;
  }

  @task(function* () {
    let categories = yield this.store.findAll('category');
    this.categoryOptions = categories;
  })
  loadCategories;

  rollbackModel() {
    if (this.args.model && this.args.model.hasDirtyAttributes) {
      this.args.model.rollbackAttributes();
    }
  }

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
}
