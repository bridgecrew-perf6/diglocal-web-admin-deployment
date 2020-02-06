import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedRegionScoopsViewRoute extends Route {
  @tracked breadCrumb;

  model(params) {
    return this.store.findRecord('scoop', params.scoop_id, { include: 'business' } );
  }

  afterModel(model) {
    let modelName = model.description;

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
