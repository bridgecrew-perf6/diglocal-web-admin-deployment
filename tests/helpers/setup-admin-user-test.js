import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setBreakpoint } from 'ember-responsive/test-support';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import Service from '@ember/service';
import { resolve } from 'rsvp';

const firebaseAppStub = Service.extend({
  auth() {
    return resolve({ currentUser: { uid: '999' }});
  },
});

/*
* Acceptance test setup that defines the current user
* as an admin with full admin privileges.
*
* This does NOT authenticate the session automatically.
* It simply sets the stub FirebaseApp service to return
* a current user id that matches the admin user created here.
*
*/

export default function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    setBreakpoint('large');
    this.owner.register('service:firebase-app', firebaseAppStub);
    this.currentUser = this.server.create('user', 'adminUser', {
      id: '999'
    });
  });

  hooks.afterEach(function() {
    if (window.localStorage) {
      window.localStorage.clear();
    }
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    resetStorages();
  });
}
