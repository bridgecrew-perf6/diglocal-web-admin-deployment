import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.createRecord('category');
  },
  saveModel: task(function*(model) {
    yield model.save();
    alert('saved!');
    this.transitionTo('authenticated.site-settings.categories.view', model);
  }).drop(),

  actions: {
    save(model) {
      get(this, 'saveModel').perform(model);
    },
    cancel(model) {
      model.deleteRecord();
      this.transitionTo('authenticated.site-settings.categories');
    }
  }
});
