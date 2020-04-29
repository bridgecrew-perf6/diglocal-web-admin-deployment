import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { isArray } from '@ember/array';
import config from 'diglocal-manage/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = config.apiHost;

  namespace = 'api/v3';

  @service() session;

  get headers() {
    const headers = {};
    if (this.session.isAuthenticated) {
      const token = get(this, 'session.data.authenticated.credential.i');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  handleResponse(status, headers, payload) {
    let responseObject = super.handleResponse(...arguments);

    if (status === 403) {
      /*
      * TODO - after long idle, occasionally the server seems to get out of sync with our authenticated firebase user
      * and sends a 403 response. The 403 is not returned again if you refresh the page, therefore loading
      * the firebase user again, etc.
      * Need to determine strategy for handling this scenario.
      */
    }

    if (responseObject && responseObject.isAdapterError) {
      let httpErrorResponse = {
        status,
        headers
      };
      try {
        let payloadObj = JSON.parse(payload);
        httpErrorResponse.payload = payloadObj;
        if (isArray(payloadObj.errors)) {
          responseObject.errors = payloadObj.errors;
        }
      } catch(e) {
        httpErrorResponse.payload = payload;
      }
      responseObject.httpErrorResponse = httpErrorResponse;
    }

    return responseObject;
  }
}

