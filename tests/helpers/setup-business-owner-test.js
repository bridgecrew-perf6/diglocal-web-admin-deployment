import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setBreakpoint } from 'ember-responsive/test-support';
import Service from '@ember/service';
import { resolve } from 'rsvp';

const firebaseAppStub = Service.extend({
  auth() {
    return resolve({ currentUser: { uid: '2222' }});
  },
});

/*
* Acceptance test setup that defines the current user
* as a single business owner user.
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
    let region = this.server.create('region');
    let business = this.server.create('business', { region });
    this.currentUser = this.server.create('user', {
      firebaseId: '2222',
      businesses: [ business ]
    });
    this.region = region;
    this.business = business;
  });
}
