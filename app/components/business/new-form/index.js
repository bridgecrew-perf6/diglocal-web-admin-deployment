import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task, all } from 'ember-concurrency';

export default class BusinessNewFormComponent extends Component {
  @service store;
  @service regions;
  @service router;

  @tracked showPartOne = true;
  @tracked showPartTwo = false;
  @tracked showPartThree = false;
  @tracked showPartFour = false;

  get partOneComplete() {
    return this.showPartTwo || this.showPartThree || this.showPartFour;
  }

  get partTwoComplete() {
    return this.showPartThree || this.showPartFour;
  }

  get partThreeComplete() {
    return this.showPartFour;
  }

  willDestroy() {
    this.rollbackModel();
  }

  rollbackModel() {
    if (this.args.model && typeof this.args.model.rollbackAttributes === 'function') {
      this.args.model.rollbackAttributes();
    }
  }

  @task(function*() {
    let model = this.args.model;
    yield model.save();
    let locations = model.locations.filterBy('hasDirtyAttributes');
    yield all(locations.invoke('save'));
    // if (this.args.afterSave) {
    //   return this.args.afterSave(this.args.model);
    // }
    return this.args.model;
  })
  saveTask;

  @task(function*(next) {
    let saved = yield this.saveTask.perform();
    if (next === 2) {
      yield this.args.model.hasMany('locations').reload();
      this.showPartOne = false;
      this.showPartTwo = true;
    }
    if (next === 3) {
      this.showPartTwo = false;
      this.showPartThree = true;
    }
    if (next === 4) {
      this.showPartThree = false;
      this.showPartFour = true;
    }
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
  save() {
    return this.saveTask.perform();
  }

  @action
  savePartOne() {
    return this.saveAndNext.perform(2);
  }

  @action
  savePartTwo() {
    return this.saveAndNext.perform(3);
  }

  @action
  savePartThree() {
    return this.saveAndNext.perform(4);
  }

  @action
  complete() {
    return this.saveAndComplete.perform();
  }

  @action
  cancel() {
    this.rollbackModel();
    this.router.transitionTo('authenticated.region.businesses.index');
  }
}
