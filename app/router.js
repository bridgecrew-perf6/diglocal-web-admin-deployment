import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');

  this.route('authenticated', { path: '/' }, function() {
    this.route('analytics', function() {
      this.route('index', { path: '/' });
    });
    this.route('site-settings', function() {
      this.route('index', { path: '/' });
      this.route('categories', function() {
        this.route('index', { path: '/' });
        this.route('new');
        this.route('view', { path: ':id' });
      });
    });
    this.route('site-stats', function() {
      this.route('index', { path: '/' });
    });
    this.route('businesses', function() {
      this.route('view', { path: ':id' }, function() {
        this.route('locations');
        this.route('photos');
        this.route('scoops');
        this.route('social');
      });
    });
    this.route('users', function() {
      this.route('view', { path: ':id' });
    });
    this.route('scoops', function() {
      this.route('view', { path: ':id' });
    });
  });
});

export default Router;
