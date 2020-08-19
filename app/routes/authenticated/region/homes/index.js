import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';
import { hash } from 'rsvp';

export default class AuthenticatedRegionHomesIndexRoute extends Route {
  @service ellaSparse;

  queryParams = {
    search: { refreshModel: true },
    sort: { refreshModel: true },
    categories: { refreshModel: true }
  };

  breadCrumb = {
    title: 'Homes'
  };

  model(params) {
    let regionId = this.paramsFor('authenticated.region').region_id;

    let homes = get(this, 'ellaSparse').array((range = {}, query = {}) => {
      let page = {
        limit: get(range, 'length') || 10,
        offset: get(range, 'start') || 0
      };

      let filter = removeEmpty(params);

      filter.region = regionId;
      filter.active = [true,false];

      let sort = filter.sort;

      if (filter.sort.match('default')) {
        sort = null;
      }

      delete filter.sort;

      // Combine the pagination and filter parameters into one object
      // for Ember Data's .query() method
      query = Object.assign({ filter, page, sort }, query);
      query.include = 'location,location.business,location.business.categories,avatar,digitalAssets';

      // Return a Promise that resolves with the array of fetched data
      // and the total available records
      return this.store.query('home', query).then((result) => {
        return {
          data: result,
          total: get(result, 'meta.page.total')
        }
      });
    });

    return hash({
      homes,
      categories: this.store.query('category', { filter: { region: regionId }})
    });
  }

  setupController(controller, hash) {
    let { categories } = hash;
    super.setupController(...arguments);
    controller.set('categoryOptions', categories);
  }

  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.setProperties({
        search: '',
        searchString: ''
      });
    }
  }
}
