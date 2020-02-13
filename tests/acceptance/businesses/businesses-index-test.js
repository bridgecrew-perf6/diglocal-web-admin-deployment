import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { testId } from 'diglocal-manage/tests/helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | Businesses | Index', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    let otherRegion = this.server.create('region');
    this.server.createList('business', 5, { region });
    this.server.createList('business', 3, { region: otherRegion });

    this.region = region;
    this.otherRegion = otherRegion;
    this.url = `/region/${this.region.id}/businesses`;
  });

  test('I can view all businesses', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('business-listing')).exists({ count: 5 });
  });

  test('I can switch my active region and see all businesses updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('business-listing')).exists({ count: 5 });

    await click(testId('select-region-dd-trigger'));
    await click(`${testId('select-region', this.otherRegion.id)} button`);

    assert.equal(currentURL(), `/region/${this.otherRegion.id}/businesses`);
    assert.dom(testId('business-listing')).exists({ count: 3 });
  });

});
