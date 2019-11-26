import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    let region = this.store.peekRecord('region', 1);

    if (!region) {
      region = this.store.push({data: { id: 1, type: 'region' }});
    }
    return this.store.createRecord('category', {
      region
    });
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
