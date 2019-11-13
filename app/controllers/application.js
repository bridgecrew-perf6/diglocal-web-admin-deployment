import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),
  firebaseApp: service(),
  router: service(),

  isAuthenticated: readOnly('session.isAuthenticated'),

  displayOutlet: computed('router.currentRouteName', function() {
    // prevent flash render of protected content while user logs out
    let current = get(this, 'router.currentRouteName')

    return ['login'].includes(current);
  }),

  actions: {
    logout() {
      get(this, 'session').invalidate();
    }
  }
});
