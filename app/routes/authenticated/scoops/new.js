import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.createRecord('scoop');
  },
  saveModel: task(function*(model) {
    yield model.save();
    this.transitionTo('authenticated.scoops.view', model);
  }).drop(),

  actions: {
    save(model) {
      get(this, 'saveModel').perform(model);
    },
    cancel(model) {
      model.deleteRecord();
      this.transitionTo('authenticated.scoops');
    }
  }
});
