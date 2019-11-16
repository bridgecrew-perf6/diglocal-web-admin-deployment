import Component from '@ember/component';
import layout from '../templates/components/crunchy-kitchen-sink';
import { alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'favoriteColor': validator('presence', true),
  'favoriteFood': validator('presence', true),
});

export default Component.extend(Validations, {
  layout,

  favoriteColor: '',
  favoriteFood: '',

  demoButtonTask: task(function * () {
    yield timeout(250);
    window.alert('Fake button task completed after 250ms');
  }).restartable(),

  demoFormTask: task(function * () {
    if (this.isFormValid) {
      yield timeout(500);
      window.alert(`
        Form submitted after 500ms!
        Your favorite color is ${this.favoriteColor}.
        Your favorite food is ${this.favoriteFood}.
      `);
    }
  }),

  isFormValid: alias('validations.isValid'),

  actions: {
    submitForm() {
      return this.demoFormTask.perform();
    }
  }
});
