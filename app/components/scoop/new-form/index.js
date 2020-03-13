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
  maxIndex = 4;

  // @tracked showPartOne = true;
  // @tracked showPartTwo = false;
  // @tracked showPartThree = false;
  // @tracked showPartFour = false;
  // @tracked showPartFive = false;

  // get partOneComplete() {
  //   return this.showPartTwo || this.showPartThree || this.showPartFour || this.showPartFive;
  // }
  //
  // get partTwoComplete() {
  //   return this.showPartThree || this.showPartFour;
  // }
  //
  // get partThreeComplete() {
  //   return this.showPartFour || this.showPartFive;
  // }
  //
  // get partFourComplete() {
  //   return this.showPartFive;
  // }

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

  // @task(function*() {
  //   yield this.saveTask.perform();
  //   if (this.args.afterSave) {
  //     return yield this.args.afterSave(this.args.model);
  //   }
  // })
  // saveAndComplete;

  // @action
  // complete() {
  //   return this.saveAndComplete.perform();
  // }

  @action
  cancel() {
    this.args.rollbackModel();
  }
}
