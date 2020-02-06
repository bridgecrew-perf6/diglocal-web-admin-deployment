import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, action } from '@ember/object';

export default class AuthenticatedRegionBusinessesViewScoopsRoute extends Route {
  @service ellaSparse;

  queryParams = {
   search: { refreshModel: true },
  };

  breadCrumb = {
    title: 'Scoops'
  };

  model() {
    let business = this.modelFor('authenticated.region.businesses.view');

    return get(this, 'ellaSparse').array((range = {}, query = {}) => {
      // let { sort, filter } = getProperties(this, 'sort', 'filter');
      let page = {
        limit: get(range, 'length') || 10,
        offset: get(range, 'start') || 0
      };

      let filter = { business: business.id };

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
  }

  @action
  save(model) {
    model.save();
  }
}
