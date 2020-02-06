import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedRegionSiteSettingsCategoriesViewRoute extends Route {
  @tracked breadCrumb;

  model(params) {
    return this.store.findRecord('category', params.category_id);
  }

  afterModel(model) {
    let modelName = model.longName;

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
