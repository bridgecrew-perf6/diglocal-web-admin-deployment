import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { oneWay } from '@ember/object/computed';
import { get, set, setProperties } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default Controller.extend({
  queryParams: [
    'search',
    'dateRange',
    'grouping'
  ],

  search: '',
  dateRange: [moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
  range: oneWay('dateRange'),
  searchString: oneWay('search'),
  grouping: 'day',

  didSearch: task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    set(this, 'search', this.searchString);
    set(this, 'dateRange', this.range);
  }).restartable(),

  actions: {
    clearSearch() {
      setProperties(this, {
        search: '',
        searchString: ''
      });
    },
    sortChanged(key) {
      alert(key);
    },
    onClose() {},
    onReady() {},
    dateGroupChanged(value) {
      set(this, 'grouping', value);
    }

  }
});
