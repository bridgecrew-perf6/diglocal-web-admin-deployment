import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedRegionHomesViewRoute extends Route {
  @tracked breadCrumb;

  model(params) {
    return this.store.findRecord('home', params.home_id, { include: 'location,location.business,digitalAssets,avatar' } );
  }

  afterModel(model) {
    let modelName = model.description;

    if (modelName) {
      this.breadCrumb = {
        title: modelName
      };
    }
  }
}
