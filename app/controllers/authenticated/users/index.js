import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import { set, setProperties } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default Controller.extend({
  queryParams: [
    'search',
    'sort'
  ],

  search: '',

  searchString: oneWay('search'),

  didSearch: task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    set(this, 'search', this.searchString);
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
    }
  }
});
