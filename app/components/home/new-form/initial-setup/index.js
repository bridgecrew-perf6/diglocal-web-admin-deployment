import Component from '@glimmer/component';
import config from 'diglocal-manage/config/environment';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class HomeNewFormInitialSetupComponent extends Component {
  @service currentUser;
  @service regions;
  @service store;

  @tracked selectedBusiness = null;

  constructor() {
    super(...arguments);

    if (this.args.preselectedBusiness) {
      this.selectedBusiness = this.args.preselectedBusiness;
    }
  }

  @(task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let regionId = this.regions.activeRegion.id;
    let filter = Object.assign({}, { search, region: regionId });
    filter = removeEmpty(filter);
    return this.store.query('business', { filter, include: 'locations' });
  }).restartable())
  searchBusinesses;

  @action
  didSelectBusiness(business) {
    this.selectedBusiness = business;
    this.args.model.location =  business.locations.firstObject;
  }
}
