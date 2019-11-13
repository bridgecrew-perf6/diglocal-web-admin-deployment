import Component from '@ember/component';
import { getProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
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
  onLogin() {},
  onSignUp() {},

  username: '',
  password: '',

  isFormValid: alias('validations.isValid'),

  actions: {
    submit() {
      if (this.isFormValid)  {
        let { username, password } = getProperties(this, 'username', 'password');

        this.isLogin ? this.onLogin(username, password) : this.onSignUp(username, password);
      }
    }
  }
});
