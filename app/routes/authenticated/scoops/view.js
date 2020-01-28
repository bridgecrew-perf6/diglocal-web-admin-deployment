import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

@classic
export default class ViewRoute extends Route.extend(AuthenticatedRouteMixin) {
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
