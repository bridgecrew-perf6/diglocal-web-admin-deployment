import Component from '@glimmer/component';
import config from 'diglocal-manage/config/environment';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class HomeNewFormInitialSetupComponent extends Component {
  @service currentUser;
  @service regions;
  @service store;

  @(task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let regionId = this.regions.activeRegion.id;
    let filter = Object.assign({}, { search, region: regionId });
    filter = removeEmpty(filter);
    return this.store.query('business', { filter });
  }).restartable())
  searchBusinesses;
}
