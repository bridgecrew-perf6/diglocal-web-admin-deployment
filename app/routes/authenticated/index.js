import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
export default class IndexRoute extends Route.extend() {
  @service regions;

  breadCrumb = null;

  redirect() {
    this.replaceWith('authenticated.region.businesses', this.regions.activeRegion.id);
  }
}
