import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import { selectChoose } from 'ember-power-select/test-support';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import setupBusinessOwnerTest from 'diglocal-manage/tests/helpers/setup-business-owner-test';

module('Acceptance | Region | Business Owner User', function(hooks) {
  setupBusinessOwnerTest(hooks);

  hooks.beforeEach(function() {
    this.additionalRegion = this.server.create('region');
    this.server.create('region');

    if (window.localStorage) {
      window.localStorage.clear();
    }
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    resetStorages();
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

  module('Single business owner', function(/*hooks*/) {
    test('My region is auto-selected to that of my business', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/region/${this.region.id}/businesses`);
      assert.dom(testId('active-region')).hasText(this.region.longName);
    });

    test('I cannot switch regions', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/region/${this.region.id}/businesses`);
      assert.dom(testId('active-region')).hasText(this.region.longName);
      assert.dom(testId('select-region-dd-trigger')).hasAttribute('aria-disabled', "true");

      await click(testId('select-region-dd-trigger'));

      assert.dom(testId('select-region')).doesNotExist();

    });
  });

  module('Business owner has multiple businesses across multiple regions', function(hooks) {
    hooks.beforeEach(function() {
      this.additionalBusiness = this.server.create('business', {
        region: this.additionalRegion,
        users: [ this.currentUser ]
      });
    });

    test('If no region is selected, I am prompted to select one from the regions to which my businesses belong only', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/select-region`);
      assert.dom(testId('select-region-form')).exists();

      await click(`${testId('select-active-region')} .ember-power-select-trigger`);
      assert.dom('.ember-power-select-option').exists({ count: 2 });
      assert.equal(this.server.schema.regions.all().models.length, 3);

      await selectChoose(testId('select-active-region'), this.additionalRegion.longName);
      await click(testId('submit-region'));

      assert.equal(currentURL(), `/region/${this.additionalRegion.id}/businesses`);
      assert.dom(testId('active-region')).hasText(this.additionalRegion.longName);
    });

    test('I can visit a url with region specified and see my active region updated', async function(assert) {
      await authenticateSession();
      await visit(`/region/${this.region.id}/businesses`);

      assert.equal(currentURL(), `/region/${this.region.id}/businesses`);
      assert.dom(testId('active-region')).hasText(this.region.longName);
    });

    test('If I visit a url with a region in which I have no businesses, I am redirected to select region', async function(assert) {
      await authenticateSession();
      await visit(`/region/BAD_REGION/businesses`);

      assert.equal(currentURL(), `/select-region`);
    });
  });


});
