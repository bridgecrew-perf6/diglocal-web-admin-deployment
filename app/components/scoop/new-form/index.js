import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class ScoopNewFormComponent extends Component {
  @service store;
  @service regions;
  @service router;

  @tracked sectionIndex = 0;
  maxIndex = 3;

  willDestroy() {
    return this.args.rollbackModel();
  }

  @task(function*() {
    let model = this.args.model;
    yield model.save();
    return model;
  })
  saveTask;

  @task(function*() {
    let saved = yield this.saveTask.perform();
    if (this.sectionIndex === this.maxIndex) {
      return this.args.afterSave ? yield this.args.afterSave(this.args.model) : saved;
    }
    this.sectionIndex += 1;
    return saved;
  })
  saveAndNext;

  @action
  goBack() {
    this.sectionIndex -= 1;
  }

  @action
  cancel() {
    this.args.rollbackModel();
  }
}
