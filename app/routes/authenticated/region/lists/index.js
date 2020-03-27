import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';

export default class AuthenticatedRegionListsIndexRoute extends Route {
  @service ellaSparse;

  queryParams = {
    search: { refreshModel: true },
    listTypes: { refreshModel: true }
  };

  breadCrumb = {
    title: 'Lists'
  };

  model(params) {
    let regionId = this.paramsFor('authenticated.region').region_id;

    return this.ellaSparse.array((range = {}, query = {}) => {
      let page = {
        limit: get(range, 'length') || 10,
        offset: get(range, 'start') || 0
      };
      // Route specific query formatting
      let formatted = this._formatQuery({ ...params});

      let filter = removeEmpty(formatted);

      filter.region = regionId;

      // let sort = filter.sort;
      // delete filter.sort;

      // Combine the pagination and filter parameters into one object
      // for Ember Data's .query() method
      query = Object.assign({ filter, page/*, sort*/ }, query);
      query.include = 'user';

      // Return a Promise that resolves with the array of fetched data
      // and the total available records
      return this.store.query('list', query).then((result) => {
        return {
          data: result,
          total: get(result, 'meta.page.total')
        }
      });
    });
  }

  _formatQuery(query) {
    query.itemType = query.listTypes;

    if (query.listTypes.find(type => type === 'pinned')) {
      query.pinned = true;
      query.itemType = query.listTypes.filter(type => type !== 'pinned');
    }

    delete query.listTypes;

    return query;
  }
}
