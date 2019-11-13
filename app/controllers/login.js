import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';

export default Controller.extend({
  session: service('session'),
  firebaseApp: service(),
  store: service(),

  isLogin: true,
  authenticating: false,
  error: null,

  authenticateWithEmail: task(function* (email, password) {
    set(this, 'authenticating', true);
    const auth = yield get(this, 'firebaseApp').auth();
    try {
      let authenticatedUser = yield auth.signInWithEmailAndPassword(email, password);
      return authenticatedUser;
    } catch(e) {
      // console.log(e);
      set(this, 'error', e);
    }
    set(this, 'authenticating', false);
  }),

  signupWithEmail: task(function* (email, password) {
    set(this, 'authenticating', true);
    const auth = yield get(this, 'firebaseApp').auth();
    try {
      let createdUser = yield auth.createUserWithEmailAndPassword(email, password);
      return createdUser;
    } catch(e) {
      // console.log(e);
      set(this, 'error', e);
    }
    set(this, 'authenticating', false);
  }),

  actions: {
    login(email, password) {
      this.authenticateWithEmail.perform(email, password);
    },
    signup(email, password) {
      this.signupWithEmail.perform(email, password);
    },
    switchActionType() {
      set(this, 'isLogin', !this.isLogin);
      set(this, 'errors', null);
    }
  }
});
