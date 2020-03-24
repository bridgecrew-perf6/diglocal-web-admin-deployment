import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HeaderSelectBusinessComponent extends Component {
  @service('regions') regionsService;
  @service currentUser;
  @service router;

  @action
  selectBusiness(business, dd) {
    dd.actions.close();
    this.regionsService.activeBusiness = business;
    this.regionsService.activeRegion = business.region;
    this.router.transitionTo('authenticated.manage.business.index', business.id);
  }
}
