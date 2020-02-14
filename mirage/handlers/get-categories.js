import { Collection } from 'ember-cli-mirage';
import { camelize } from '@ember/string';

const filterCategories = function(categories, request) {
  let filters = [];
  let sort = request.queryParams['sort'];
  let search =  request.queryParams['filter[search]'];
  let region = request.queryParams['filter[region]'];

  if (region) {
    filters.push(category => category.region && category.region.id === region);
  }

  if (search) {
    filters.push(category => category.longName && category.longName.match(search));
  }

  let results = filters
    .reduce(((results, filter) => results.filter(filter)), categories);

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

export default function getCategories(schema, request) {
  let categories = schema.categories.all().models;

  let offset = request.queryParams['page[offset]'];
  let limit = request.queryParams['page[limit]'];

  let results = new Collection(
    'category',
    filterCategories(categories, request)
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
