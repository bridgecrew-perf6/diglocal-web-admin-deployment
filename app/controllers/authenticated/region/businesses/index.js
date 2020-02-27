import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay, union } from '@ember/object/computed';
import { set, setProperties } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

const roleOptions = [
  { value: 'premium', label: 'Paid Listing'},
  { value: '2types', label: 'Paid Listing with 2 Categories'},
  { value: 'temporary', label: 'Non-Paying (Temporary)'},
];

export default Controller.extend({
  sortMenuOptions: Object.freeze({
    likes_count: 'Sort by likes',
    name: 'Sort by name',
    created_at: 'Sort by created at'
  }),

  queryParams: [
    'search',
    'sort',
    'featured',
    'active',
    'archived',
    'categories',
    'roles'
  ],

  init() {
    this._super(...arguments);
    this.setProperties({
      roles: [],
      categories: [],
      roleOptions
    })
  },

  sort: '-created_at',
  search: '',
  featured: false,
  active: false,
  archived: false,

  searchString: oneWay('search'),

  didSearch: task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    set(this, 'search', this.searchString);
  }).restartable(),

  collectedFilters: union(
    'roles',
    'categories'
  ),

  actions: {
    clearSearch() {
      setProperties(this, {
        search: '',
        searchString: ''
      });
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
        featured: false,
        active: false,
        archived: false,
        roles: [],
        categories: []
      });
    }
  }
});
