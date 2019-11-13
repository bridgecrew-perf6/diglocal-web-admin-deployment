import Controller from '@ember/controller';
import { set, setProperties } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import config from 'diglocal-manage/config/environment';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default Controller.extend({
  queryParams: [
    'search'
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
    }
  }
});
