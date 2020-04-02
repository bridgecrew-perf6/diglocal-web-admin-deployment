import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { layout as templateLayout } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/crunchy-kitchen-sink';
import { task, timeout } from 'ember-concurrency';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'favoriteColor': validator('presence', true),
  'favoriteFood': validator('presence', true),
});

@classic
@templateLayout(layout)
export default class CrunchyKitchenSink extends Component.extend(Validations) {
  favoriteColor = '';
  favoriteFood = '';
  imageUrl = 'https://storage.googleapis.com/philanthrosphere-production.appspot.com/demo/assets/images/99656b34-4207-4746-89f4-f2a0c9e30143/thumb@512_outside_media.jpeg';

  @(task(function * () {
    yield timeout(250);
    window.alert('Fake button task completed after 250ms');
  }).restartable())
  demoButtonTask;

  @task(function * () {
    if (this.isFormValid) {
      yield timeout(500);
      window.alert(`
        Form submitted after 500ms!
        Your favorite color is ${this.favoriteColor}.
        Your favorite food is ${this.favoriteFood}.
      `);
    }
  })
  demoFormTask;

  @alias('validations.isValid')
  isFormValid;

  @action
  submitForm() {
    return this.demoFormTask.perform();
  }
}
