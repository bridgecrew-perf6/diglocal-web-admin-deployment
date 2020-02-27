import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, getProperties, set } from '@ember/object';
import { task } from 'ember-concurrency';
import { validator, buildValidations } from 'ember-cp-validations';
import firebase from 'firebase/app';
import { capitalize } from '@ember/string';

const Validations = buildValidations({
  'username': validator('presence', {
    presence: true,
    message: 'Please provide your email'
  }),
  'password': validator('presence', {
    presence: true,
    description: 'Password'
  }),
});

export default Component.extend(Validations, {
  session: service('session'),
  firebaseApp: service(),
  store: service(),

  isLogin: true,
  authenticating: false,
  error: null,

  username: '',
  password: '',

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

  authenticateWithProvider: task(function* (provider) {
    set(this, 'authenticating', true);
    const auth = yield get(this, 'firebaseApp').auth();
    try {
      const authProvider = new firebase.auth[`${capitalize(provider)}AuthProvider`]();
      let authenticatedUser = yield auth.signInWithPopup(authProvider);
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
    submit() {
      let { username, password } = getProperties(this, 'username', 'password');

      return this.isLogin ?
        this.authenticateWithEmail.perform(username, password) :
        this.signupWithEmail.perform(username, password);
    },
    switchActionType() {
      set(this, 'isLogin', !this.isLogin);
      set(this, 'errors', null);
    }
  }
});
