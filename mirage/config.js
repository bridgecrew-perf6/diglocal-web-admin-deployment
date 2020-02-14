import genericRelationshipRouteHandler from './handlers/generic-relationship';
import getBusinesses from './handlers/get-businesses';
import getLocations from './handlers/get-locations';
import getUsers from './handlers/get-users';
import getScoops from './handlers/get-scoops';
import getCategories from './handlers/get-categories';
import getImpressionTrackers from './handlers/get-impression-trackers';

export default function() {
  this.namespace = '/api/v3';
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.resource('businesses', { except: [ 'index' ] });
  this.get('businesses', getBusinesses);
  this.resource('business-images');
  this.resource('categories', { except: [ 'index' ] });
  this.get('/categories', getCategories);
  this.resource('impression-trackers', { except: [ 'index' ] });
  this.get('/impression-trackers', getImpressionTrackers);
  this.resource('business-images');
  this.resource('locations', { except: [ 'index' ] });
  this.get('/locations', getLocations);
  this.resource('operating-hours');
  this.resource('profile-images');
  this.resource('regions');
  this.resource('scoops', { except: [ 'index' ] });
  this.get('/scoops', getScoops);
  this.resource('users', { except: [ 'index' ] });
  this.get('/users', getUsers);

  this.get('/:collection_name/:id/relationships/:relationship', genericRelationshipRouteHandler);
  this.get('/:collection_name/:id/:relationship', genericRelationshipRouteHandler);

  this.passthrough('https://www.googleapis.com/**');
}
