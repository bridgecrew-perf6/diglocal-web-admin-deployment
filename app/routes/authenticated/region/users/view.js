import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedRegionUsersViewRoute extends Route {
  @tracked breadCrumb;

  model(params) {
    return this.store.findRecord('user', params.user_id, { include: 'businesses' } );
  }

  afterModel(model) {
    let modelName = model.name;

    if (modelName) {
      this.breadCrumb = {
        title: modelName
      };
    }
  }

  @action
  save(model) {
    model.save();
  }
}
