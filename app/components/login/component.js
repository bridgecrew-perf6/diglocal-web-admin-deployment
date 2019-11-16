import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, getProperties, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import { validator, buildValidations } from 'ember-cp-validations';

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

  isFormValid: alias('validations.isValid'),

  actions: {
    submit() {
      if (this.isFormValid)  {
        let { username, password } = getProperties(this, 'username', 'password');

        this.isLogin ?
          this.authenticateWithEmail.perform(username, password) :
          this.signupWithEmail.perform(username, password);
      }
    },
    switchActionType() {
      set(this, 'isLogin', !this.isLogin);
      set(this, 'errors', null);
    }
  }
});
