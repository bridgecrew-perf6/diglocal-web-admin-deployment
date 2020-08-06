import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { oneWay } from '@ember/object/computed';
import { get, action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import config from 'diglocal-manage/config/environment';
import { inject as service } from '@ember/service';
const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class AuthenticatedRegionBusinessesViewHomesIndexController extends Controller {
  @service router;

  queryParams = [
    'search',
    'sort'
  ];

  sortMenuOptions = {
    created_at: 'Sort by date created',
    event_date: 'Sort by event date'
  };

  @tracked sort = '-event_date';
  @tracked search = '';
  @oneWay('search') searchString;

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
  viewHome(home) {
    // scoop is a proxy object, must use 'get' to access properties
    let homeId = get(home, "id");
    this.router.transitionTo('authenticated.region.businesses.view.homes.view', homeId);
  }
}
