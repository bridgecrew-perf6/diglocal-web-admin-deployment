import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import { get, action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class AuthenticatedRegionScoopsIndexController extends Controller {
  @service router;

  sortMenuOptions = {
    created_at: 'Sort by date created',
    paid_rank: 'Sort by paid rank',
    event_date: 'Sort by event date',
    default: 'Sort by default'
  };

  queryParams = [
    'search',
    'sort',
    'categories'
  ];

  @tracked categories = [];
  @tracked search = '';
  @tracked sort = '-default';
  @tracked search = '';

  @oneWay('search')
  searchString;

  @(task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    this.search = this.searchString;
  }).restartable())
  didSearch;

  get collectedFilters() {
    return this.categories;
  }

  @action
  sortChanged(key) {
    this.sort = key;
  }

  @action
  clearSearch() {
    this.search = '';
    this.searchString = '';
  }

  @action
  addFilter(filter, arrayName, event) {
    let { target: { checked } } = event;
    if (checked) {
      this[arrayName].addObject(filter);
    } else {
      this[arrayName].removeObject(filter);
    }
  }

  @action
  removeFilter(filter, arrayName) {
    this[arrayName].removeObject(filter);
  }

  @action
  clearAllFilters() {
    this.listTypes = [];
  }

  @action
  viewScoop(scoop) {
    // business and scoop are proxies, must use 'get' to access properties
    let business = get(scoop, 'business');
    let businessId = get(business, 'id');
    let scoopId = get(scoop, 'id');
    this.router.transitionTo('authenticated.region.businesses.view.scoops.view', businessId, scoopId);
  }
}
