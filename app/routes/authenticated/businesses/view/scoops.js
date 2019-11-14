import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend(AuthenticatedRouteMixin, {
  ellaSparse: service(),

  queryParams: {
   search: { refreshModel: true },
  },
  breadCrumb: Object.freeze({
    title: 'Scoops'
  }),
  model(params, transition) {
    return get(this, 'ellaSparse').array((range = {}, query = {}) => {
      // let { sort, filter } = getProperties(this, 'sort', 'filter');
      let page = {
        limit: get(range, 'length') || 10,
        offset: get(range, 'start') || 0
      };

      let businessId = get(transition, 'to.parent.params.id');
      let filter = { business: businessId };

      // Combine the pagination and filter parameters into one object
      // for Ember Data's .query() method
      query = Object.assign({ filter, page /*, sort */ }, query);
      query.include = 'business,business.categories';

      // Return a Promise that resolves with the array of fetched data
      // and the total available records
      return this.store.query('scoop', query).then((result) => {
        return {
          data: result,
          total: get(result, 'meta.page.total')
        }
      });
    });
  },
  actions: {
    save(model) {
      model.save();
    }
  }
});
