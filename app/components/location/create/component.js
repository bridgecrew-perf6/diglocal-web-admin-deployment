import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set, computed } from '@ember/object';

export default Component.extend({
  store: service(),

  hasNewRecord: computed('business', 'newRecord.isDeleted', function() {
    return this.newRecord && !this.newRecord.get('isDeleted');
  }),

  actions: {
    create() {
      set(this, 'newRecord', this.store.createRecord('location', {
        business: get(this, 'business')
      }));
    }
  }
});
