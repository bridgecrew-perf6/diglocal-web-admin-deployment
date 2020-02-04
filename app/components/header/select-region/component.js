import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class HeaderSelectRegionComponent extends Component {
  @service regions;

  @alias('regions.activeRegion') activeRegion;

  @action
  selectRegion(region, dd) {
    dd.actions.close();
    this.activeRegion = region;
  }
}
