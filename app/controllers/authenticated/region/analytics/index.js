import { oneWay } from '@ember/object/computed';
import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class AuthenticatedRegionAnalyticsIndexController extends Controller {
  queryParams = [
    'search',
    'dateRange',
    'grouping'
  ];

  @tracked search = '';
  @tracked dateRange = [moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
  @tracked grouping = 'month';

  @oneWay('dateRange') range;
  @oneWay('search') searchString;

  @(task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    this.search = this.searchString;
    this.dateRange = this.range;
  }).restartable())
  didSearch;

  @action
  clearSearch() {
    this.search = '';
    this.searchString = '';
  }

  @action
  sortChanged(key) {
    alert(key);
  }

  @action
  onClose() {}

  @action
  onReady() {}

  @action
  dateGroupChanged(value) {
    this.grouping = value;
  }
}
