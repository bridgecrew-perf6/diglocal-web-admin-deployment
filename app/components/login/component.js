import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import firebase from 'firebase/app';
import { capitalize } from '@ember/string';
import { tracked } from '@glimmer/tracking';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string().required().label('Email'),
  password: yup.string().required().label('Password')
});

export default class LoginComponent extends Component {
  @service session;
  @service firebaseApp;
  @service store;

  loginSchema = loginSchema;

  @tracked isLogin = true;
  @tracked authenticating = false;
  @tracked error;

  @tracked username = '';
  @tracked password = '';

  @task(function* (email, password) {
    this.authenticating = true;
    const auth = yield this.firebaseApp.auth();
    try {
      let authenticatedUser = yield auth.signInWithEmailAndPassword(email, password);
      return authenticatedUser;
    } catch(e) {
      // console.log(e);
      this.error = e;
    }
    this.authenticating = false;
  })
  authenticateWithEmail;

  @task(function* (provider) {
    this.authenticating = true;
    const auth = yield this.firebaseApp.auth();
    try {
      let authProvider;
      if (provider === 'apple') {
        authProvider = new firebase.auth.OAuthProvider('apple.com');
      } else {
        authProvider = new firebase.auth[`${capitalize(provider)}AuthProvider`]();
      }
      let authenticatedUser = yield auth.signInWithPopup(authProvider);
      return authenticatedUser;
    } catch(e) {
      // console.log(e);
      this.error = e;
    }
    this.authenticating = false;
  })
  authenticateWithProvider;

  @task(function* (email, password) {
    this.authenticating = true;
    const auth = yield this.firebaseApp.auth();
    try {
      let createdUser = yield auth.createUserWithEmailAndPassword(email, password);
      return createdUser;
    } catch(e) {
      // console.log(e);
      this.error = e;
    }
    this.authenticating = false;
  })
  signupWithEmail;

  @action
  submit() {
    return this.isLogin ?
      this.authenticateWithEmail.perform(this.username, this.password) :
      this.signupWithEmail.perform(this.username, this.password);
  }
  @action
  switchActionType() {
    this.isLogin = !this.isLogin;
    this.error = null;
  }

}

