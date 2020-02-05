import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import { set, setProperties } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

const roleOptions = [
  { value: 'admin', label: 'Admin'},
  { value: 'customer', label: 'Customer'},
  { value: 'user', label: 'User'},
];

export default Controller.extend({
  sortMenuOptions: Object.freeze({
    user: 'Sort by username',
    email: 'Sort by email'
  }),

  queryParams: [
    'roles',
    'search',
    'sort'
  ],

  sort: '',
  search: '',
  searchString: oneWay('search'),

  init() {
    this._super(...arguments);
    this.setProperties({
      roles: [],
      roleOptions
    });
  },

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
      this.roles.clear();
    }
  }
});
