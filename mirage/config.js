import genericRelationshipRouteHandler from './handlers/generic-relationship';
import getBusinesses from './handlers/get-businesses';
import getLocations from './handlers/get-locations';

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
  this.resource('categories');
  this.resource('impression-trackers');
  this.resource('business-images');
  this.resource('locations', { except: [ 'index' ] });
  this.get('/locations', getLocations);
  this.resource('operating-hours');
  this.resource('profile-images');
  this.resource('regions');
  this.resource('scoops');
  this.resource('users');

  this.get('/:collection_name/:id/relationships/:relationship', genericRelationshipRouteHandler);
  this.get('/:collection_name/:id/:relationship', genericRelationshipRouteHandler);

  this.passthrough('https://www.googleapis.com/**');
}
