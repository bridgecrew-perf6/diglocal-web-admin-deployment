'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'diglocal-manage',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    // fontawesome: {
    //   defaultPrefix: 'fal' // light icons
    // }
  };

  ENV['firebase'] = {
    apiKey: "AIzaSyC9m3rFmih3ZR1S6FtE19JpCgdMxK6hDew",
    authDomain: "dig-this.firebaseapp.com",
    databaseURL: "https://dig-this.firebaseio.com",
    projectId: "dig-this",
    storageBucket: "dig-this.appspot.com",
    messagingSenderId: "244853276058",
    appId: "1:244853276058:web:f55f46ff02a02a46840e23",
    measurementId: "G-CGFE62TFCC",
    cloudFunctions: 'https://us-central1-dig-this.cloudfunctions.net'
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'authenticated.businesses',
    routeIfAlreadyAuthenticated: 'authenticated.businesses'
  };

  ENV['ember-cli-mirage'] = {
    enabled: false
  };

  if (environment === 'development') {
    ENV.apiHost = 'http://localhost:3000';

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'mirage') {
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'staging') {
    ENV.apiHost = 'https://diglocal-staging.herokuapp.com';
  }

  if (environment === 'production') {
    ENV.apiHost = 'https://diglocal.herokuapp.com';
  }

  return ENV;
};
