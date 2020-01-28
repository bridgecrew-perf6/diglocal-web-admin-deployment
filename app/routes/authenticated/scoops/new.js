import classic from 'ember-classic-decorator';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import { task } from 'ember-concurrency';

@classic
export default class NewRoute extends Route.extend(AuthenticatedRouteMixin) {
  model() {
    return this.store.createRecord('scoop');
  }

  @(task(function*(model) {
    yield model.save();
    this.transitionTo('authenticated.scoops.view', model);
  }).drop())
  saveModel;

  @action
  save(model) {
    get(this, 'saveModel').perform(model);
  }

  @action
  cancel(model) {
    model.deleteRecord();
    this.transitionTo('authenticated.scoops');
  }
}
