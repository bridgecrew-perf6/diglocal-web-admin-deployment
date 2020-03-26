import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class AuthenticatedRegionListsIndexController extends Controller {
  queryParams = [
    'search',
    // 'sort',
    // 'listTypes'
  ];

  listTypeOptions = [
    { value: 'pinned', label: 'Pinned Lists' },
    { value: 'business', label: 'Business Lists' },
    { value: 'scoop', label: 'Scoop Lists' }
  ];

  @tracked listTypes = [];

  @tracked search = '';
  @tracked sort = "-created_at";

  @oneWay('search')
  searchString;


  @(task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    this.search = this.searchString;
  }).restartable())
  didSearch;

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
}
