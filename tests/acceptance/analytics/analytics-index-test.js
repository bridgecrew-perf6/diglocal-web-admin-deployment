import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, focus, blur } from '@ember/test-helpers';
import { testId } from 'diglocal-manage/tests/helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | Analytics | Index', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    let otherRegion = this.server.create('region');
    this.server.create('business', { region, name: 'Crunchy Bananas' });
    this.server.createList('business', 4, { region });
    this.server.createList('business', 3, { region: otherRegion });

    this.region = region;
    this.otherRegion = otherRegion;
    this.url = `/region/${this.region.id}/analytics`;
  });

  test('I can view analytics for each business', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('analytics-tr')).exists({ count: 5 });
  });

  test('I can switch my active region and see analytics table updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('analytics-tr')).exists({ count: 5 });

    await click(testId('select-region-dd-trigger'));
    await click(`${testId('select-region', this.otherRegion.id)} button`);

    assert.equal(currentURL(), `/region/${this.otherRegion.id}/analytics`);
    assert.dom(testId('analytics-tr')).exists({ count: 3 });
  });

  test('I can search and see results updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('analytics-tr')).exists({ count: 5 });

    await focus(testId('search'));
    await fillIn(testId('search'), 'Crunchy Bananas');
    await blur(testId('search'));

    assert.dom(testId('analytics-tr')).exists({ count: 1 });
  });
});
