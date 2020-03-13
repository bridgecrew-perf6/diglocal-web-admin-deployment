import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';
import { setFlatpickrDate, closeFlatpickrDate } from 'ember-flatpickr/test-support/helpers';
import moment from 'moment';

module('Acceptance | View Business | Scoops | New', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    this.business = this.server.create('business', 'withLocation', { region });
    this.region = region;
    this.url = `/region/${this.region.id}/businesses/${this.business.id}/scoops/new`;
  });

  const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSSSZ';

  const fillOutRecurringDealScoop = async function() {
    await fillIn(testId('description-field'), '2-for-1 drinks');
    await fillIn(testId('fineText-field'), 'Celebrate the end of the week with 2-for-1 drinks');

    await click(testId('next'));

    await click(`${testId('isDeal-toggle')} .x-toggle`);

    await click(testId('next'));
    await click(testId('next'));

    await click(testId('post-scoop-weekly'));
    await click(testId('post-on-Thursday'));
    await click(testId('post-on-Friday'));
    await click(`${testId('recurring-display-to')} input[type="text"]`);
    await setFlatpickrDate(`${testId('recurring-display-to')} input`, '2050-10-23', true);
    await closeFlatpickrDate(`${testId('recurring-display-to')} input`);

    await click(testId('next'));
  };

  const fillOutOneTimeScoop = async function(context) {
    await fillIn(testId('description-field'), 'Spring festival');
    await fillIn(testId('fineText-field'), 'Annual spring festival and parade');

    await click(testId('next'));

    await click(`${testId('isEvent-toggle')} .x-toggle`);
    await click(`${testId('event-date')} input[type="text"]`);
    await setFlatpickrDate(`${testId('event-date')} input`, '2021-04-18', true);
    await closeFlatpickrDate(`${testId('event-date')} input`);

    await click(`${testId('event-start-time')} input[type="text"]`);
    await setFlatpickrDate(`${testId('event-start-time')} input`, '13:00', true);
    await closeFlatpickrDate(`${testId('event-start-time')} input`);

    await click(`${testId('event-end-time')} input[type="text"]`);
    await setFlatpickrDate(`${testId('event-end-time')} input`, '18:00', true);
    await closeFlatpickrDate(`${testId('event-end-time')} input`);

    await click(testId('next'));
    await click(testId('next'));
    await click(testId('next'));

    // await click(testId('post-scoop-once'));

    // await click(`${testId('post-at')} input[type="text"]`);
    // await setFlatpickrDate(`${testId('post-at')} input`, '2021-01-01', true);
    // await closeFlatpickrDate(`${testId('post-at')} input`);
  };

  module('Create new scoop', function(/*hooks*/) {
    test('I can create a new recurring scoop for a business', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), `/region/${this.region.id}/businesses/${this.business.id}/scoops/new`);
      assert.dom(testId('selected-business-name')).hasText(this.business.name, 'Business is pre-selected for new scoop');
      await fillOutRecurringDealScoop();
      await click(testId('finish'));

      let created = this.server.schema.scoops.first();
      assert.equal(created.businessId, this.business.id, 'Scoop is created with relationship to business');
      assert.ok(created.description, 'Scoop has description');
      assert.ok(created.fineText, 'Scoop has fineText');
      assert.equal(created.isDeal, true, 'Scoop is deal as expected');
      assert.equal(created.isRecurring, true, 'Scoop is recurring as expected');
      assert.equal(created.daysOfWeek.join(','), '4,5', 'Scoop has correct days of week to post');

      let today = moment().format(dateTimeFormat).split('T')[0];
      let endDate = moment('2050-10-23').format(dateTimeFormat).split('T')[0];

      assert.equal(created.recurringDisplayFrom.split('T')[0], today);
      assert.equal(created.recurringDisplayTo.split('T')[0], endDate);
      assert.notOk(created.isActive);
      assert.equal(currentURL(), `/region/${this.region.id}/businesses/${this.business.id}/scoops/${created.id}`);
    });

    test('I can create a new one-time scoop for a business', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), `/region/${this.region.id}/businesses/${this.business.id}/scoops/new`);
      assert.dom(testId('selected-business-name')).hasText(this.business.name, 'Business is pre-selected for new scoop');
      await fillOutOneTimeScoop();
      await click(testId('finish'));

      let created = this.server.schema.scoops.first();
      console.log(created);
      assert.equal(created.businessId, this.business.id, 'Scoop is created with relationship to business');
      assert.ok(created.description, 'Scoop has description');
      assert.ok(created.fineText, 'Scoop has fineText');
      assert.equal(created.isDeal, false, 'Scoop is not deal as expected');
      assert.equal(created.isRecurring, false, 'Scoop is one time event as expected');
      assert.equal(created.eventDate, '2021-04-18', 'Scoop has correct event date');
      assert.equal(created.eventStartTime, '13:00:00', 'Scoop has correct event start time');
      assert.equal(created.eventEndTime, '18:00:00', 'Scoop has correct event end time');

      let today = moment().format(dateTimeFormat).split('T')[0];

      assert.equal(created.postAt.split('T')[0], today);
      assert.notOk(created.isActive);
      assert.equal(currentURL(), `/region/${this.region.id}/businesses/${this.business.id}/scoops/${created.id}`);
    });
  });

});
