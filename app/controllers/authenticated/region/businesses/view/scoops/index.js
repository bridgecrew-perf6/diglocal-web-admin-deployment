import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { oneWay } from '@ember/object/computed';
import {  action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import config from 'diglocal-manage/config/environment';
const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class AuthenticatedRegionBusinessesViewScoopsIndexController extends Controller {
  queryParams = [
    'search',
    'sort'
  ];

  sortMenuOptions = {
    created_at: 'Sort by creation date',
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
}
