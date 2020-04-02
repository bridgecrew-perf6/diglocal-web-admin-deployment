import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/crunchy-sort-by';
import { set, action, computed } from '@ember/object';
import { assert } from '@ember/debug';

@classic
@templateLayout(layout)
@classNames('crunchy-sort-by', 'flex')
export default class CrunchySortBy extends Component {
  sort = '';
  @tracked sortAttribute = '';
  @tracked sortDescending = false;

  _updateSort() {
    if (!this.sortAttribute) { return; }
    let sort = this.sortDescending ? `-${this.sortAttribute}` : this.sortAttribute;
    set(this, 'sort', sort);
  }

  init() {
    super.init(...arguments);
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
  }

  get ariaLabelForToggle() {
    return `Sort items in ${this.sortDescending ? 'descending' : 'ascending'} order`;
  }

  @computed('sortMenuOptions', 'sortAttribute')
  get sortMenuName() {
    return this.sortMenuOptions[this.sortAttribute] || 'Sort by';
  }

  onChange() {}

  @action
  didSelectSortAttr(attr, dropdown) {
    dropdown.actions.close();
    set(this, 'sortAttribute', attr)
    this._updateSort();
    this.onChange(this.sort);
  }

  @action
  toggleSort() {
    this.toggleProperty('sortDescending');
    this._updateSort();
    this.onChange(this.sort);
  }
}
