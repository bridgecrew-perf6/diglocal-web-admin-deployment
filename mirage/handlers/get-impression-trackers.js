import { Collection } from 'ember-cli-mirage';
import { camelize } from '@ember/string';

const filterImpressionTrackers = function(impressionTrackers, request) {
  let filters = [];
  let sort = request.queryParams['sort'];
  let search =  request.queryParams['filter[search]'];
  let businessId = request.queryParams['filter[business]'];
  let region = request.queryParams['filter[region]'];

  if (region) {
    filters.push(impression => impression.business && impression.business.region && impression.business.region.id === region);
  }

  if (search) {
    filters.push(impression => impression.business && impression.business.name.match(search));
  }

  if (businessId) {
    filters.push(impression => impression.business && impression.business.id === businessId);
  }

  let results = filters
    .reduce(((results, filter) => results.filter(filter)), impressionTrackers);

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

export default function getImpressionTrackers(schema, request) {
  let impressionTrackers = schema.impressionTrackers.all().models;

  let offset = request.queryParams['page[offset]'];
  let limit = request.queryParams['page[limit]'];

  let results = new Collection(
    'impression-tracker',
    filterImpressionTrackers(impressionTrackers, request)
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
