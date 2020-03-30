import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedManageBusinessScoopsViewRoute extends Route {
  @tracked breadCrumb;

  model(params) {
    return this.store.findRecord('scoop', params.manage_scoop_id, { include: 'business' } );
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
