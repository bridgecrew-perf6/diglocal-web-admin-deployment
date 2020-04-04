import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay, union } from '@ember/object/computed';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class AuthenticatedRegionBusinessesIndexController extends Controller {
  queryParams = [
    'search',
    'sort',
    'featured',
    'active',
    'archived',
    'categories',
    'roles'
  ];

  sortMenuOptions = {
    likes_count: 'Sort by likes',
    name: 'Sort by name',
    created_at: 'Sort by date created'
  };

  roleOptions = [
    { value: 'premium', label: 'Paid Listing'},
    { value: '2types', label: 'Paid Listing with 2 Categories'},
    { value: 'temporary', label: 'Non-Paying (Temporary)'},
  ];

  @tracked search = '';
  @oneWay('search') searchString;

  @tracked sort = '-created_at';
  @tracked featured = false;
  @tracked active = false;
  @tracked archived = false;
  @tracked categories = [];
  @tracked roles = [];

  @union('roles', 'categories') collectedFilters;

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
    this.featured = false;
    this.active = false;
    this.archived = false;
    this.roles = [];
    this.categories = [];
  }
}

