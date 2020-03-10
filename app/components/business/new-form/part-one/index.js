import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class BusinessNewFormPartOneComponent extends Component {
  @service store;
  @service regions;

  @tracked categoryOptions = [];

  roleOptions = [
    'temporary',
    'premium',
    '2types'
  ];

  constructor() {
    super(...arguments);
    this.loadCategories.perform();
  }

  @task(function* () {
    let regionId = this.regions.activeRegion.id;
    let categories = yield this.store.query('category', { region: regionId });
    this.categoryOptions = categories;
  })
  loadCategories;
}
