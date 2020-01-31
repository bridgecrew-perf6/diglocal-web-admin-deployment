import { Collection } from 'ember-cli-mirage';
import { camelize } from '@ember/string';

const filterScoops = function(scoops, request) {
  let filters = [];
  let sort = request.queryParams['sort'];
  let search =  request.queryParams['filter[search]'];
  let businessId = request.queryParams['filter[business]'];
  let region = request.queryParams['filter[region]'];

  if (region) {
    filters.push(scoop => scoop.business && scoop.business.region && scoop.business.region.id === region);
  }

  if (search) {
    filters.push(scoop => scoop.description && scoop.description.match(search));
  }

  if (businessId) {
    filters.push(scoop => scoop.business && scoop.business.id === businessId);
  }

  let results = filters
    .reduce(((results, filter) => results.filter(filter)), scoops);

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

export default function getScoops(schema, request) {
  let scoops = schema.scoops.all().models;

  let offset = request.queryParams['page[offset]'];
  let limit = request.queryParams['page[limit]'];

  let results = new Collection(
    'scoop',
    filterScoops(scoops, request)
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
