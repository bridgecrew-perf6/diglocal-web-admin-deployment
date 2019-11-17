import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import { set, setProperties } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default Controller.extend({
  queryParams: [
    'roles',
    'search',
    'sort'
  ],

  search: '',
  searchString: oneWay('search'),
  roles: '',

  init() {
    this._super(...arguments);
    set(this, 'roles', []);
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
    sortChanged(key) {
      alert(key);
    },
    addRoleFilter(roleId, event) {
      let { target: { checked } } = event;
      if (checked) {
        this.roles.addObject(roleId);
      } else {
        this.roles.removeObject(roleId);
      }
    },
    removeRoleFilter(roleId) {
      this.roles.removeObject(roleId);
    },
    clearAllFilters() {
      this.roles.clear();
    }
  }
});
