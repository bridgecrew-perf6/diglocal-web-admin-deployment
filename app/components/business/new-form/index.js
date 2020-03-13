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
  @tracked showPartFive = false;

  get partOneComplete() {
    return this.showPartTwo || this.showPartThree || this.showPartFour || this.showPartFive;
  }

  get partTwoComplete() {
    return this.showPartThree || this.showPartFour || this.showPartFive;
  }

  get partThreeComplete() {
    return this.showPartFour || this.showPartFive;
  }

  get partFourComplete() {
    return this.showPartFive;
  }

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
    if (next === 5) {
      this.showPartFour = false;
      this.showPartFive = true;
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
  complete() {
    return this.saveAndComplete.perform();
  }

  @action
  cancel() {
    this.args.rollbackModel();
  }
}
