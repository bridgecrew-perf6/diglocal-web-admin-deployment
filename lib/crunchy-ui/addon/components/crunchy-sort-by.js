import Component from '@ember/component';
import layout from '../templates/components/crunchy-sort-by';
import { computed, set } from '@ember/object';

export default Component.extend({
  layout,

  classNames: [ 'crunchy-sort-by', 'flex' ],

  sort: '',
  sortAttribute: '',
  sortDescending: false,

  _updateSort() {
    if (!this.sortAttribute) { return; }
    let sort = this.sortDescending ? `-${this.sortAttribute}` : this.sortAttribute;
    set(this, 'sort', sort);
  },

  init() {
    this._super(...arguments);
    set(this, 'sortMenuOptions', {});
    if (this.sort && this.sort.startsWith('-')) {
      set(this, 'sortDescending', true);
      this.setProperties({
        sortDescending: true,
        sortAttribute: this.sort.slice(1)
      })
    }
  },

  ariaLabelForToggle: computed('sortDescending', {
    get() {
      return `Sort items in ${this.sortDescending ? 'descending' : 'ascending'} order`;
    }
  }),

  sortMenuName: computed('sortMenuOptions', 'sortAttribute', function() {
    return this.sortMenuOptions[this.sortAttribute] || 'Sort by';
  }),

  onChange() {},

  willDestroyElement() {
    this.setProperties({
      sort: '',
      sortAttribute: '',
      sortDescending: false
    });
    this._super(...arguments);
  },

  actions: {
    didSelectSortAttr(attr, dropdown) {
      dropdown.actions.close();
      set(this, 'sortAttribute', attr)
      this._updateSort();
      this.onChange(this.sort);
    },

    toggleSort() {
      this.toggleProperty('sortDescending');
      console.log(this.sortDescending);
      this._updateSort();
      this.onChange(this.sort);
    },
  }
});
