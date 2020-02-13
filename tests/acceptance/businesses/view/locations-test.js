import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, findAll } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';
import { isFlatpickrOpen, setFlatpickrDate, closeFlatpickrDate } from 'ember-flatpickr/test-support/helpers';

module('Acceptance | View Business | Locations', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    this.business = this.server.create('business', { region });
    this.region = region;
    this.url = `/region/${this.region.id}/businesses/${this.business.id}/locations`;
  });

  const fillOutLocationDetails = async function() {
    await fillIn(testId('title-field'), 'South Plaza');
    await fillIn(testId('address-field'), '123 Amazing Street');
    await fillIn(testId('city-field'), 'Asheville');
    await fillIn(testId('state-field'), 'NC');
    await fillIn(testId('zip-field'), '28803');
    await fillIn(testId('phone-field'), '111-222-3333');
    await fillIn(testId('menuUrl-field'), 'https://www.menu.com');
  };

  module('Add location', function(/*hooks*/) {
    test('I can add a location if a business has none existing', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('location-detail-card')).doesNotExist();
      assert.equal(this.server.schema.locations.all().models.length, 0);

      await click(testId('add-location'));
      assert.dom(testId('location-detail-card-new')).exists();

      await fillOutLocationDetails();
      await click(testId('save'));

      assert.dom(testId('location-detail-card')).exists({ count: 1 });
      assert.dom(testId('location-detail-card')).includesText('South Plaza');
      assert.dom(testId('display-hours-table')).hasText('No hours found');
      assert.dom(testId('address-field')).isDisabled();
      assert.dom(testId('location-detail-card-new')).doesNotExist();

      assert.equal(this.server.schema.locations.all().models.length, 1);
    });

    test('I can add a new location with operating hours', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('location-detail-card')).doesNotExist();
      assert.equal(this.server.schema.locations.all().models.length, 0);

      await click(testId('add-location'));
      assert.dom(testId('location-detail-card-new')).exists();

      await fillOutLocationDetails();
      assert.dom(testId('display-hours-table')).hasText('No hours found');

      await click(testId('edit-hours'));
      assert.dom(testId('edit-hours')).doesNotExist();
      assert.dom(testId('delete-hours')).exists();

      assert.dom(testId('openTime')).exists({ count: 7 });
      assert.dom(testId('closeTime')).exists({ count: 7 });
      assert.dom(testId('closed-checkbox')).exists({ count: 7 });

      await click(`${testId('fields-for-day', 0)} ${testId('openTime')} input[type="text"]`);
      assert.ok(isFlatpickrOpen(0));

      await setFlatpickrDate(`${testId('fields-for-day', 0)} ${testId('openTime')} input`, '08:00', true);
      await closeFlatpickrDate(`${testId('fields-for-day', 0)} ${testId('openTime')} input`);
      assert.notOk(isFlatpickrOpen(0));

      await click(`${testId('fields-for-day', 0)} ${testId('closeTime')} input[type="text"]`);
      assert.ok(isFlatpickrOpen(1));

      await setFlatpickrDate(`${testId('fields-for-day', 0)} ${testId('closeTime')} input`, '18:00', true);
      await closeFlatpickrDate(`${testId('fields-for-day', 0)} ${testId('closeTime')} input`);
      assert.notOk(isFlatpickrOpen(1));

      await click(`${testId('fields-for-day', 1)} ${testId('closed-checkbox')}`);
      await click(`${testId('fields-for-day', 2)} ${testId('closed-checkbox')}`);
      await click(`${testId('fields-for-day', 3)} ${testId('closed-checkbox')}`);
      await click(`${testId('fields-for-day', 4)} ${testId('closed-checkbox')}`);
      await click(`${testId('fields-for-day', 5)} ${testId('closed-checkbox')}`);
      await click(`${testId('fields-for-day', 6)} ${testId('closed-checkbox')}`);
      await click(testId('save'));

      assert.dom(testId('location-detail-card')).exists({ count: 1 });
      assert.dom(testId('location-detail-card')).includesText('South Plaza');
      assert.dom(testId('address-field')).isDisabled();
      assert.dom(testId('location-detail-card-new')).doesNotExist();

      assert.dom(testId('display-hours-table')).exists();
      assert.dom(`${testId('display-hours-table')} tr`).exists({ count: 7 });
      assert.dom(testId('display-for-day', 0)).hasText('Sunday 8:00am to 6:00pm');
      assert.dom(testId('display-for-day', 1)).hasText('Monday Closed');
      assert.dom(testId('edit-hours')).doesNotExist();
      assert.dom(testId('delete-hours')).doesNotExist();

      assert.equal(this.server.schema.locations.all().models.length, 1);
      assert.equal(this.server.schema.locations.first().operatingHours.length, 7);
    });
  });

  module('Edit locations', function(hooks) {
    hooks.beforeEach(function() {
      let locations = this.server.createList('location', 2, 'withHours');
      this.business.update({
        locations
      });
    });

    test('I see all locations for the business', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('location-detail-card')).exists({ count: 2 });
    });

    test('I can delete a location', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('location-detail-card')).exists({ count: 2 });

      await click(testId('edit-location', this.business.locations.models[0].id));
      await click(testId('delete'));
      await click(testId('confirm-ok'));

      assert.dom(testId('location-detail-card')).exists({ count: 1 });
    });

    test('I can delete the operating hours for a location', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('location-detail-card')).exists({ count: 2 });

      let idToEdit = this.business.locations.models[0].id;
      assert.dom(findAll(testId('display-hours-table'))[0]).doesNotIncludeText('No hours found');
      assert.dom(findAll(testId('display-hours-table'))[0]).includesText('Monday');

      await click(testId('edit-location', idToEdit));
      await click(testId('edit-hours'));
      await click(testId('delete-hours'));

      assert.dom(testId('openTime')).doesNotExist();
      assert.dom(testId('closeTime')).doesNotExist();
      assert.dom(testId('closed-checkbox')).doesNotExist();
      assert.dom(testId('edit-hours')).exists();
      assert.dom(testId('delete-hours')).doesNotExist();

      await click(testId('save'));
      assert.dom(findAll(testId('display-hours-table'))[0]).hasText('No hours found');
      assert.dom(findAll(testId('display-hours-table'))[0]).doesNotIncludeText('Monday');
      assert.equal(this.server.schema.locations.find(idToEdit).operatingHours.length, 0);
    });

    test('I can edit the details for a location', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('location-detail-card')).exists({ count: 2 });

      let idToEdit = this.business.locations.models[0].id;
      assert.dom(testId('location-form', idToEdit)).doesNotIncludeText('South Plaza');

      await click(testId('edit-location', idToEdit));
      await fillOutLocationDetails();
      await click(testId('save'));

      assert.dom(findAll(testId('location-detail-card'))[0]).includesText('South Plaza');
      assert.dom(`${testId('location-form', idToEdit)} ${testId('address-field')}`).isDisabled();
    });
  });

});
