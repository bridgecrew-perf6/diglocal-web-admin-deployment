import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay, union } from '@ember/object/computed';
import { set, setProperties } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default Controller.extend({
  sortMenuOptions: Object.freeze({
    created_at: 'Sort by creation date',
    paid_rank: 'Sort by paid rank',
    event_date: 'Sort by event date'
  }),

  isList: true,

  queryParams: [
    'search',
    'sort',
    'categories'
  ],

  init() {
    this._super(...arguments);
    this.set('categories', []);
  },

  search: '',
  sort: '-event_date',

  searchString: oneWay('search'),

  didSearch: task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    set(this, 'search', this.searchString);
  }).restartable(),

  collectedFilters: union(
    'categories'
  ),

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
    },
    addFilter(filter, arrayName, event) {
      let { target: { checked } } = event;
      if (checked) {
        this.get(arrayName).addObject(filter);
      } else {
        this.get(arrayName).removeObject(filter);
      }
    },
    removeFilter(filter, arrayName) {
      this.get(arrayName).removeObject(filter);
    },
    clearAllFilters() {
      this.setProperties({
        categories: []
      });
    }
  }
});
