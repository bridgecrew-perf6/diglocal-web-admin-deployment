import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class AuthenticatedRegionsUsersIndexController extends Controller {
  queryParams = [
    'roles',
    'search',
    'sort'
  ];

  sortMenuOptions = {
    user: 'Sort by username',
    email: 'Sort by email'
  };

  roleOptions = [
    { value: 'admin', label: 'Admin'},
    { value: 'customer', label: 'Customer'},
    { value: 'user', label: 'User'},
  ];

  @tracked search = '';
  @oneWay('search') searchString;
  @tracked sort = '';
  @tracked roles = [];

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
    this.roles = [];
  }
}

