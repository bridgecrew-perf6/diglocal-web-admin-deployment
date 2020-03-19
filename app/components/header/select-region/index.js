import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class HeaderSelectRegionComponent extends Component {
  @service('regions') regionsService;
  @service currentUser;
  @service router;

  @alias('regionsService.activeRegion') activeRegion;

  @action
  selectRegion(region, dd) {
    dd.actions.close();
    this.activeRegion = region;

    let indexRoutes = [
      'authenticated.region.scoops.index',
      'authenticated.region.site-settings.index',
      'authenticated.region.site-settings.categories.index',
      'authenticated.region.analytics.index'
    ];
    if (indexRoutes.includes(this.router.currentRouteName)) {
      return this.router.transitionTo(this.router.currentRouteName, region.id);
    }
    this.router.transitionTo('authenticated.region', region.id);
  }
}
