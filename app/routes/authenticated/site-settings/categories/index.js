import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend(AuthenticatedRouteMixin, {
  ellaSparse: service(),

  breadCrumb: Object.freeze({
    title: 'Categories'
  }),
  model() {
    return get(this, 'ellaSparse').array((range = {}, query = {}) => {
      // let { sort, filter } = getProperties(this, 'sort', 'filter');
      let page = {
        limit: get(range, 'length') || 10,
        offset: get(range, 'start') || 0
      };
      // Combine the pagination and filter parameters into one object
      // for Ember Data's .query() method
      query = Object.assign({ page /*, sort */ }, query);

      // Return a Promise that resolves with the array of fetched data
      // and the total available records
      return this.store.query('category', query).then((result) => {
        return {
          data: result,
          total: get(result, 'meta.page.total')
        }
      });
    });
  }
});
