import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params, transition) {
    let businessId = get(transition, 'to.parent.params.id');
    let filter = { businesses: businessId };

    return this.store.query('user', { filter });
  },

  actions: {
    save(model) {
      model.save();
    }
  }
});
