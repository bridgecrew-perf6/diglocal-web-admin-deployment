import { Collection } from 'ember-cli-mirage';
import { camelize } from '@ember/string';

const filterBusinesses = function(businesses, request) {
  let filters = [];
  let sort = request.queryParams['sort'];
  let search =  request.queryParams['filter[search]'];
  let roles = request.queryParams['filter[role]'];
  let categories = request.queryParams['filter[categories]'];
  let featured = request.queryParams['filter[featured]'];
  let region = request.queryParams['filter[region]'];

  if (region) {
    filters.push(business => business.region && business.region.id === region);
  }

  if (search) {
    filters.push(business => business.name && business.name.match(search));
  }

  if (roles) {
    filters.push(business => business.role && roles.includes(business.role));
  }

  if (categories) {
    categories.forEach(filterId => {
      filters.push(business => business.categories.length && business.categoryIds.includes(filterId));
    })
  }

  if (featured) {
    filters.push(business => business.featured);
  }

  let results = filters
    .reduce(((results, filter) => results.filter(filter)), businesses);

  if (sort) {
    let isDescending = sort.startsWith('-');
    if (isDescending) {
      results = results.sortBy(camelize(sort.slice(1))).reverse();
    } else {
      results = results.sortBy(camelize(sort));
    }
  }

  return results;
};

export default function getBusinesses(schema, request) {
  let businesses = schema.businesses.all().models;

  let offset = request.queryParams['page[offset]'];
  let limit = request.queryParams['page[limit]'];

  let results = new Collection(
    'business',
    filterBusinesses(businesses, request)
  );

  let total = results.length;

  if (offset && limit) {
    offset = Number.parseInt(offset);
    limit = Number.parseInt(limit);

    let end = offset + limit;
    results = results.slice(offset, end);
  }

  results.meta = {
    total
  };

  return results;
}
