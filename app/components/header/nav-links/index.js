import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { alias } from '@ember/object/computed';

export default class Header extends Component {
  @service('regions') regionsService;
  @service currentUser;

  @alias('regionsService.activeRegion') activeRegion;
  @alias('regionsService.activeBusiness') activeBusiness;
}
