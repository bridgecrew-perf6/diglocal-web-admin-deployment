import { Collection } from 'ember-cli-mirage';

const filterLocations = function(locations, request) {
  let filters = [];
  let sort = request.queryParams['sort'];
  let businessId = request.queryParams['filter[business]'];

  if (businessId) {
    filters.push(location => location.business && location.business.id === businessId);
  }

  let results = filters
    .reduce(((results, filter) => results.filter(filter)), locations);

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

export default function getLocations(schema, request) {
  let locations = schema.locations.all().models;

  let offset = request.queryParams['page[offset]'];
  let limit = request.queryParams['page[limit]'];

  let results = new Collection(
    'location',
    filterLocations(locations, request)
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
