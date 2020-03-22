import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task, all } from 'ember-concurrency';

export default class BusinessNewFormComponent extends Component {
  @service store;
  @service regions;
  @service router;

  @tracked sectionIndex = 0;
  maxIndex = 4;

  willDestroy() {
    return this.args.rollbackModel();
  }

  @task(function*() {
    let model = this.args.model;
    yield model.save();
    let locations = model.locations.filterBy('hasDirtyAttributes');
    yield all(locations.invoke('save'));
    return model;
  })
  saveTask;

  @task(function*() {
    let saved = yield this.saveTask.perform();
    if (this.sectionIndex === 1) {
      yield this.args.model.hasMany('locations').reload();
    }
    if (this.sectionIndex === this.maxIndex) {
      return this.args.afterSave ? yield this.args.afterSave(this.args.model) : saved;
    }
    this.sectionIndex += 1;
    return saved;
  })
  saveAndNext;

  @task(function*() {
    yield this.saveTask.perform();
    if (this.args.afterSave) {
      return yield this.args.afterSave(this.args.model);
    }
  })
  saveAndComplete;

  @action
  goBack() {
    this.sectionIndex -= 1;
  }

  @action
  cancel() {
    this.args.rollbackModel();
  }
}
