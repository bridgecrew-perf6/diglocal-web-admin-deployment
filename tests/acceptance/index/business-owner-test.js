import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import { selectChoose } from 'ember-power-select/test-support';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import StorageObject from 'ember-local-storage/local/object';
import setupBusinessOwnerTest from 'diglocal-manage/tests/helpers/setup-business-owner-test';

module('Acceptance | Index | Business Owner User', function(hooks) {
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
    test('My business is auto-selected as the active business', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/manage/business/${this.business.id}`);
      assert.dom(testId('active-business')).hasText(this.business.name);
    });

    test('I cannot switch businesses', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/manage/business/${this.business.id}`);
      assert.dom(testId('active-business')).hasText(this.business.name);
      assert.dom(testId('select-business-dd-trigger')).hasAttribute('aria-disabled', "true");

      await click(testId('select-business-dd-trigger'));

      assert.dom(testId('select-business')).doesNotExist();
    });

    test('I cannot visit admin region routes', async function (assert) {
      await authenticateSession();
      await visit(`region/${this.region.id}/businesses`);

      assert.equal(currentURL(), `/manage/business/${this.business.id}`);
      assert.dom(testId('active-business')).hasText(this.business.name);
      assert.dom(testId('select-region')).doesNotExist();
    });
  });

  module('Business owner has multiple businesses, no active business in storage', function(hooks) {
    hooks.beforeEach(function() {
      this.additionalBusiness = this.server.create('business', {
        region: this.additionalRegion,
        users: [ this.currentUser ]
      });
      //
      // Create a business that does not belong to the current user
      this.server.create('business');
    });

    test('If no business is selected, I am prompted to select one from my businesses only', async function(assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/select-business`);
      assert.dom(testId('select-business-form')).exists();

      await click(`${testId('select-active-business')} .ember-power-select-trigger`);
      assert.dom('.ember-power-select-option').exists({ count: 2 });
      assert.equal(this.server.schema.businesses.all().models.length, 3);

      await selectChoose(testId('select-active-business'), this.additionalBusiness.name);
      await click(testId('submit-business'));

      assert.equal(currentURL(), `/manage/business/${this.additionalBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.additionalBusiness.name);
    });

    test('I can visit a url with business specified and see my active business updated', async function(assert) {
      await authenticateSession();
      await visit(`/manage/business/${this.additionalBusiness.id}`);

      assert.equal(currentURL(), `/manage/business/${this.additionalBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.additionalBusiness.name);
    });

    test('If I visit a url with a business that I do not own, I am redirected to select business', async function(assert) {
      await authenticateSession();
      await visit(`/manage/business/BAD_BUSINESS_ID`);

      assert.equal(currentURL(), `/select-business`);
    });

    test('I cannot visit admin region routes', async function (assert) {
      await authenticateSession();
      await visit(`region/${this.region.id}/businesses`);

      assert.equal(currentURL(), `/select-business`);
      assert.dom(testId('select-business-form')).exists();
    });
  });

  module('Business owner has multiple businesses, active business exists in storage', function (hooks) {
    hooks.beforeEach(function () {
      this.otherBusiness = this.server.create('business', {
        region: this.additionalRegion,
        users: [this.currentUser]
      });
      //
      // Create a business that does not belong to the current user
      this.server.create('business');

      let mockStorage = StorageObject.extend();

      this.activeBusiness = this.business;

      let businessId = this.activeBusiness.id;
      let regionId = this.activeBusiness.region.id;

      mockStorage.reopenClass({
        initialState() {
          return {
            businessId,
            regionId
          };
        }
      });

      this.owner.register('storage:active-settings', mockStorage);
    });

    test('As a multi-business owner, my active business is set to the last selected business', async function (assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/manage/business/${this.activeBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.activeBusiness.name);
    });

    test('I can visit a url with business specified and see my active business updated', async function (assert) {
      await authenticateSession();

      await visit(`/manage/business/${this.otherBusiness.id}`);

      assert.equal(currentURL(), `/manage/business/${this.otherBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.otherBusiness.name);

      await visit('/');
      assert.equal(currentURL(), `/manage/business/${this.otherBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.otherBusiness.name);
    });

    test('I am redirected to admin view if I attempt to visit a business-owner manage route', async function (assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/manage/business/${this.activeBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.activeBusiness.name);

      await visit(`/manage/business/1`);

      assert.equal(currentURL(), `/manage/business/${this.activeBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.activeBusiness.name);
    });

    test('I can switch businessess and my active business is updated', async function (assert) {
      await authenticateSession();
      await visit('/');

      assert.equal(currentURL(), `/manage/business/${this.activeBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.activeBusiness.name);

      await click(testId('select-business-dd-trigger'));
      await click(`${testId('select-business', this.otherBusiness.id)} button`);

      assert.equal(currentURL(), `/manage/business/${this.otherBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.otherBusiness.name);

      await visit('/');
      assert.equal(currentURL(), `/manage/business/${this.otherBusiness.id}`);
      assert.dom(testId('active-business')).hasText(this.otherBusiness.name);
    });

    test('If I visit a url with a business that I do not own, I am redirected to select business', async function (assert) {
      await authenticateSession();
      await visit(`/manage/business/BAD_BUSINESS_ID`);

      assert.equal(currentURL(), `/select-business`);
    });
  });
});
