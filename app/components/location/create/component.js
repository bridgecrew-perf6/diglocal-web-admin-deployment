import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Component.extend({
  store: service(),

  actions: {
    create() {
      set(this, 'newRecord', this.store.createRecord('location', {
        business: get(this, 'business')
      }));
    }
  }
});
