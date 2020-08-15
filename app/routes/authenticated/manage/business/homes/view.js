import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedManageBusinessHomesViewRoute extends Route {
  @tracked breadCrumb;

  model(params) {
    return this.store.findRecord('home', params.manage_home_id, { include: 'location,location.business' } );
  }

  afterModel(model) {
    let modelName = model.title;

    if (modelName) {
      this.breadCrumb = {
        title: modelName
      };
    }
  }
}
