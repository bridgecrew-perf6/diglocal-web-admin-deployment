import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedRegionBusinessesViewRoute extends Route {
  @tracked breadCrumb;

  model(params) {
    return this.store.findRecord('business', params.business_id, { include: 'categories,scoops,locations,locations.homes' });
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
