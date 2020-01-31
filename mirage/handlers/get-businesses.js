import { Collection } from 'ember-cli-mirage';

const filterBusinesses = function(businesses, request) {
  let filters = [];
  let sort = request.queryParams['sort'];
  let search =  request.queryParams['filter[search]'];
  let roles = request.queryParams['filter[role]'];
  let categories = request.queryParams['filter[categories]'];

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

  let results = filters
    .reduce(((results, filter) => results.filter(filter)), businesses);

  if (sort) {
    let isDescending = sort.startsWith('-');
    if (isDescending) {
      results = results.sortBy(sort.slice(1)).reverse();
    } else {
      results = results.sortBy(sort);
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
