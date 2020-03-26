import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedRegionListsViewRoute extends Route {
  @tracked breadCrumb;

  model(params) {
    return this.store.findRecord('list', params.list_id, { include: 'businesses,scoops,user' });
  }

  afterModel(model) {
    let modelName = model.name;

    if (modelName) {
      this.breadCrumb = {
        title: modelName
      };
    }
  }
}
