import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import { task } from 'ember-concurrency';

@classic
export default class NewRoute extends Route.extend() {
  model() {
    let region = this.store.peekRecord('region', 1);

    if (!region) {
      region = this.store.push({data: { id: 1, type: 'region' }});
    }
    return this.store.createRecord('category', {
      region
    });
  }

  @(task(function*(model) {
    yield model.save();
    alert('saved!');
    this.transitionTo('authenticated.region.site-settings.categories.view', model);
  }).drop())
  saveModel;

  @action
  save(model) {
    get(this, 'saveModel').perform(model);
  }

  @action
  cancel(model) {
    model.deleteRecord();
    this.transitionTo('authenticated.region.site-settings.categories');
  }
}
