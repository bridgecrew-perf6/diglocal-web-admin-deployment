import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('category', params.id);
  },

  afterModel(model) {
    let modelName = model.longName;

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
