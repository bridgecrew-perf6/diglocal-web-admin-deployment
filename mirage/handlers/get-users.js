import { Collection } from 'ember-cli-mirage';
import { camelize } from '@ember/string';

const filterUsers = function(users, request) {
  let filters = [];
  let sort = request.queryParams['sort'];
  let search =  request.queryParams['filter[search]'];
  let roles = request.queryParams['filter[roles]'];

  if (search) {
    filters.push(user => user.name && user.name.match(search));
  }

  if (roles) {
    filters.push(user => user.role && roles.includes(user.role));
  }

  let results = filters
    .reduce(((results, filter) => results.filter(filter)), users);

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

export default function getUsers(schema, request) {
  let users = schema.users.all().models;

  let offset = request.queryParams['page[offset]'];
  let limit = request.queryParams['page[limit]'];

  let results = new Collection(
    'user',
    filterUsers(users, request)
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
