import { action } from '@ember/object';
import Route from '@ember/routing/route';

export default class ViewRoute extends Route.extend() {
  model(params) {
    return this.store.findRecord('scoop', params.id, { include: 'business' } );
  }

  afterModel(model) {
    let modelName = model.description;

    if (modelName) {
      this.set('breadCrumb', {
        title: modelName
      });
    }
  }

  @action
  save(model) {
    model.save();
  }
}
