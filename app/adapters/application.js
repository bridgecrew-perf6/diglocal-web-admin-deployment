import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { isArray } from '@ember/array';
import config from 'diglocal-manage/config/environment';
import { Promise } from 'rsvp';

export default DS.JSONAPIAdapter.extend({
  host: config.apiHost,

  namespace: 'api/v3',

  session: service(),
  firebaseApp: service(),

  // RESTAdapter doesn't allow us to fetch header values async (required for Firebase getIdToken)
  // So here's a big hack to get an async context and perform the request after we retrieve
  // the latest auth token from Firebase.
  ajax(url, type, options) {
    options = options || {};
    options.headers = options.headers || {};
    const __super = this._super.bind(this);
    return this.firebaseApp.auth()
      .then(auth => {
        if (this.session.isAuthenticated && auth.currentUser) {
          return auth.currentUser.getIdToken();
        }
        return null;
      })
      .then(token => {
        if (token) options.headers['Authorization'] = `Bearer ${token}`;
        return __super(url, type, options);
      });
  },

  handleResponse(status, headers, payload) {
    let responseObject = this._super(...arguments);

    if (responseObject && responseObject.isAdapterError) {
      let httpErrorResponse = {
        status,
        headers,
      };
      try {
        let payloadObj = JSON.parse(payload);
        httpErrorResponse.payload = payloadObj;
        if (isArray(payloadObj.errors)) {
          responseObject.errors = payloadObj.errors;
        }
      } catch (e) {
        httpErrorResponse.payload = payload;
      }
      responseObject.httpErrorResponse = httpErrorResponse;
    }

    return responseObject;
  },
});
