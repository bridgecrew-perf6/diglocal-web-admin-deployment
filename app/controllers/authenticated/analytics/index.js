import classic from 'ember-classic-decorator';
import { oneWay } from '@ember/object/computed';
import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { set, setProperties, action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

@classic
export default class IndexController extends Controller {
  queryParams = [
    'search',
    'dateRange',
    'grouping'
  ];

  search = '';
  dateRange = [moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];

  @oneWay('dateRange')
  range;

  @oneWay('search')
  searchString;

  grouping = 'day';

  @(task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    set(this, 'search', this.searchString);
    set(this, 'dateRange', this.range);
  }).restartable())
  didSearch;

  @action
  clearSearch() {
    setProperties(this, {
      search: '',
      searchString: ''
    });
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
    set(this, 'grouping', value);
  }
}
