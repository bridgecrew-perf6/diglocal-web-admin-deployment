import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';
import moment from 'moment';

export default Route.extend({
  ellaSparse: service(),

  queryParams: {
   search: { refreshModel: true },
   dateRange: { refreshModel: true },
   grouping: { refreshModel: true }
  },
  breadCrumb: Object.freeze({
    title: 'Analytics'
  }),
  model(params) {
    let regionId = this.paramsFor('authenticated.region').region_id;

    return get(this, 'ellaSparse').array((range = {}, query = {}) => {
      let page = {
        limit: get(range, 'length') || 10,
        offset: get(range, 'start') || 0
      };

      let filter = removeEmpty(params);
      filter.region = regionId;
      filter.date_range = `${moment(params.dateRange[0]).format('YYYY-MM-DD')},${moment(params.dateRange[1]).format('YYYY-MM-DD')},${params.grouping}`;
      delete filter.grouping;
      // Combine the pagination and filter parameters into one object
      // for Ember Data's .query() method
      query = Object.assign({ filter, page }, query);
      query.include = 'business';

      // Return a Promise that resolves with the array of fetched data
      // and the total available records
      return this.store.query('impression-tracker', query).then((result) => {
        return {
          data: result,
          total: get(result, 'meta.page.total')
        }
      });
    });
  }
});
