import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import { selectChoose } from 'ember-power-select/test-support';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import StorageObject from 'ember-local-storage/local/object';

module('Acceptance | Admin User', function(hooks) {
  setupAdminUserTest(hooks);

  hooks.beforeEach(function() {
    let regions = this.server.createList('region', 3);
    this.server.createList('business', 2, { region: regions[0] });
    this.server.createList('business', 3, { region: regions[1] });

    this.regions = regions;
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

  module('No active region exists in storage', function() {
    hooks.beforeEach(function() {
      if (window.localStorage) {
        window.localStorage.clear();
      }
      if (window.sessionStorage) {
        window.sessionStorage.clear();
      }
      resetStorages();
    });

    test('As an admin user, if no region is selected, I am prompted to select one', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/select-region`);
      assert.dom(testId('select-region-form')).exists();
    });

    test('As an admin user, I can select an active region when prompted', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/select-region`);
      assert.dom(testId('select-region-form')).exists();

      await selectChoose(testId('select-active-region'), this.regions[2].longName);
      await click(testId('submit-region'));

      assert.equal(currentURL(), `/region/${this.regions[2].id}/businesses`);
      assert.dom(testId('active-region')).hasText(this.regions[2].longName);
    });

    test('I can visit a url with region specified and see my active region updated', async function(assert) {
      await authenticateSession();
      await visit(`/region/${this.regions[2].id}/businesses`);

      assert.equal(currentURL(), `/region/${this.regions[2].id}/businesses`);
      assert.dom(testId('active-region')).hasText(this.regions[2].longName);
    });
  });

  module('Active region exists in storage', function(hooks) {
    hooks.beforeEach(function() {
      this.activeRegion = this.regions[1];

      let mockStorage = StorageObject.extend();

      let regionId = this.activeRegion.id;

      mockStorage.reopenClass({
        initialState() {
          return {
            regionId
          };
        }
      });

      this.owner.register('storage:active-region', mockStorage);
    });

    test('As an admin user, my active region is set to the last selected region', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/region/${this.activeRegion.id}/businesses`);
      assert.dom(testId('active-region')).hasText(this.activeRegion.longName);
    });

    test('I can visit a url with region specified and see my active region updated', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/region/${this.activeRegion.id}/businesses`);
      assert.dom(testId('active-region')).hasText(this.activeRegion.longName);

      let otherRegion = this.regions[2];

      await visit(`/region/${otherRegion.id}/businesses`);

      assert.equal(currentURL(), `/region/${otherRegion.id}/businesses`);
      assert.dom(testId('active-region')).hasText(otherRegion.longName);

      await visit('/');
      assert.equal(currentURL(), `/region/${otherRegion.id}/businesses`);
      assert.dom(testId('active-region')).hasText(otherRegion.longName);
    });

    test('I can switch regions and my active region is updated', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/region/${this.activeRegion.id}/businesses`);
      assert.dom(testId('active-region')).hasText(this.activeRegion.longName);

      let otherRegion = this.regions[2];

      await click(testId('select-region-dd-trigger'));
      await click(`${testId('select-region', otherRegion.id)} button`);

      assert.equal(currentURL(), `/region/${otherRegion.id}/businesses`);
      assert.dom(testId('active-region')).hasText(otherRegion.longName);

      await visit('/');
      assert.equal(currentURL(), `/region/${otherRegion.id}/businesses`);
      assert.dom(testId('active-region')).hasText(otherRegion.longName);
    });
  });

  module('Active region exists in storage, but is not returned from server', function(hooks) {
    hooks.beforeEach(function() {
      let mockStorage = StorageObject.extend();

      let regionId = 'BAD_ID';

      mockStorage.reopenClass({
        initialState() {
          return {
            regionId
          };
        }
      });

      this.owner.register('storage:active-region', mockStorage);
    });

    test('As an admin user, if my active region is set to an id that does not exist currently, I am redirected to select region screen', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/select-region`);
    });

    test('As an admin user, if I attempt to visit a url that specifies a non-existant region, I am routed to the select region screen', async function(assert) {
      await authenticateSession();
      await visit('/region/BAD_ID/businesses');

      assert.equal(currentURL(), `/select-region`);
    });
  });


});
