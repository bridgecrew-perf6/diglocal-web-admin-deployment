import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('scoop', params.id, { include: 'business' } );
  },

  afterModel(model) {
    let modelName = model.description;

    if (modelName) {
      this.set('breadCrumb', {
        title: modelName
      });
    }
  },

  actions: {
    save(model) {
      model.save();
    }
  }
});
