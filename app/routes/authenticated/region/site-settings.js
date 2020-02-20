import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthenticatedRegionSiteSettingsRoute extends Route {
  @service regions;
  @tracked breadCrumb;

  model() {
    return this.regions.activeRegion;
  }

  afterModel(model) {
    let modelName = model.longName;

    if (modelName) {
      this.breadCrumb = {
        title: modelName
      };
    }
  }
}
