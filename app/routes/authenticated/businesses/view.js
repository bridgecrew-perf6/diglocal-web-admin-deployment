import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

@classic
export default class ViewRoute extends Route.extend(AuthenticatedRouteMixin) {
  model(params) {
    return this.store.findRecord('business', params.id, { include: 'categories,scoops,locations' } );
  }

  afterModel(model) {
    let modelName = model.name;

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
