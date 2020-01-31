import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';

export default Route.extend(AuthenticatedRouteMixin, {
  ellaSparse: service(),

  queryParams: {
    search: { refreshModel: true },
    sort: { refreshModel: true },
  },
  breadCrumb: Object.freeze({
    title: 'Scoops'
  }),

  model(params) {
    return get(this, 'ellaSparse').array((range = {}, query = {}) => {
      let page = {
        limit: get(range, 'length') || 10,
        offset: get(range, 'start') || 0
      };

      let filter = removeEmpty(params);

      let sort = filter.sort;
      delete filter.sort;

      // Combine the pagination and filter parameters into one object
      // for Ember Data's .query() method
      query = Object.assign({ filter, page, sort }, query);
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

  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.setProperties({
        sort: '-created_at',
        search: '',
        searchString: ''
      });
    }
  },
});
