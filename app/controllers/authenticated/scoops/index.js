import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import { set, setProperties } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default Controller.extend({
  sortMenuOptions: Object.freeze({
    created_at: 'Sort by creation date',
    paid_rank: 'Sort by paid rank'
  }),

  isList: true,

  queryParams: [
    'search',
    'sort'
  ],

  search: '',
  sort: '-created_at',

  searchString: oneWay('search'),

  didSearch: task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    set(this, 'search', this.searchString);
  }).restartable(),

  actions: {
    toggleView() {
      this.toggleProperty('isList');
    },
    clearSearch() {
      setProperties(this, {
        search: '',
        searchString: ''
      });
    },
    sortChanged(key) {
      set(this, 'sort', key);
    }
  }
});
