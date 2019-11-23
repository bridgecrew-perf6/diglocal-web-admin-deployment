import Component from '@ember/component';
import layout from '../templates/components/crunchy-sort-by';
import { computed, set } from '@ember/object';
import { assert } from '@ember/debug';

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
    if (this.sort && this.sort.startsWith('-')) {
      this.setProperties({
        sortDescending: true,
        sortAttribute: this.sort.slice(1)
      });
    } else if (this.sort) {
      this.set('sortAttribute', this.sort);
    }
    if (!this.sortMenuOptions) {
      assert(`The component 'crunchy-sort-by' expects property 'sortMenuOptions' to be a valid object.`)
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
      this._updateSort();
      this.onChange(this.sort);
    },
  }
});
