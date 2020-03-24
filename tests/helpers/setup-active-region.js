import resetStorages from 'ember-local-storage/test-support/reset-storage';
import StorageObject from 'ember-local-storage/local/object';

/*
* Acceptance test setup that creates and sets the active region
* in local storage, so visiting '/' in tests will not redirect
* to the select region screen.
*
* Must be called after setupMirage(hooks).
*
*/

export default function(hooks) {
  hooks.beforeEach(function() {
    this.activeRegion = this.server.create('region', { id: '888' });

    let mockStorage = StorageObject.extend();

    let regionId = this.activeRegion.id;

    mockStorage.reopenClass({
      initialState() {
        return {
          regionId,
          businessId: null
        };
      }
    });

    this.owner.register('storage:active-settings', mockStorage);
  });

  hooks.afterEach(function() {
    if (window.localStorage) {
      window.localStorage.clear();
    }
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    resetStorages();
  });
}
