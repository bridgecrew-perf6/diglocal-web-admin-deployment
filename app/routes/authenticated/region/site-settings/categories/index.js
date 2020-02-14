import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';

export default class AuthenticatedRegionSiteSettingsCategoriesNewRoute extends Route {
  @service ellaSparse;

  queryParams = {
    search: { refreshModel: true }
  };

  breadCrumb = {
    title: 'Categories'
  };

  model(params) {
    let regionId = this.paramsFor('authenticated.region').region_id;

    return get(this, 'ellaSparse').array((range = {}, query = {}) => {
      // let { sort, filter } = getProperties(this, 'sort', 'filter');

      let filter = removeEmpty(params);

      filter.region = regionId;

      let page = {
        limit: get(range, 'length') || 10,
        offset: get(range, 'start') || 0
      };
      // Combine the pagination and filter parameters into one object
      // for Ember Data's .query() method
      query = Object.assign({ filter, page /*, sort */ }, query);

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
}
