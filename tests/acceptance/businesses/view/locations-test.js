import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | View Business | Locations', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    this.business = this.server.create('business', { region });
    this.region = region;
    this.url = `/region/${this.region.id}/businesses/${this.business.id}/locations`;
  });

  module('Add location', function(/*hooks*/) {
    test('I can add a location if a business has none existing', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('location-detail-card')).doesNotExist();
      assert.equal(this.server.schema.locations.all().models.length, 0);

      await click(testId('add-location'));
      assert.dom(testId('location-detail-card-new')).exists();

      await fillIn(testId('title-field'), 'South Plaza');
      await fillIn(testId('address-field'), '123 Main Street');
      await fillIn(testId('city-field'), 'Asheville');
      await fillIn(testId('state-field'), 'NC');
      await fillIn(testId('phone-field'), '111-222-3333');
      await fillIn(testId('menuUrl-field'), 'https://www.menu.com');
      await fillIn(testId('geocodedLat-field'), '35.5661521');
      await fillIn(testId('geocodedLong-field'), '-82.5302039');
      await click(testId('save'));

      assert.dom(testId('location-detail-card')).exists({ count: 1 });
      assert.dom(testId('location-detail-card')).includesText('South Plaza');
      assert.dom(testId('address-field')).isDisabled();
      assert.dom(testId('location-detail-card-new')).doesNotExist();
      
      assert.equal(this.server.schema.locations.all().models.length, 1);
    });
  });

  module('Edit locations', function(hooks) {
    hooks.beforeEach(function() {
      this.business.update({
        locations: this.server.createList('location', 2, 'withHours')
      });
      this.server.createList('location', 3, 'withHours');
    });

    test('I see all business locations', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('location-detail-card')).exists({ count: 2 });
    });
  });

});
