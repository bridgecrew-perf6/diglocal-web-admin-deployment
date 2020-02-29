import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedRegionUsersViewRoute extends Route {
  @tracked breadCrumb;

  model(params) {
    return this.store.findRecord('user', params.user_id, { include: 'businesses' });
  }

  afterModel(model) {
    let modelName = model.email;

    if (modelName) {
      this.breadCrumb = {
        title: modelName
      };
    }
  }
}
