import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

@classic
export default class ViewRoute extends Route.extend(AuthenticatedRouteMixin) {
  model(params) {
    return this.store.findRecord('category', params.id);
  }

  afterModel(model) {
    let modelName = model.longName;

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
