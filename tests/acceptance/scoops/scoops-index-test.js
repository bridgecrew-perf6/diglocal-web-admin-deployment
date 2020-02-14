import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, focus, blur } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | Scoops | Index', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    let otherRegion = this.server.create('region');
    this.server.create('business', {
      region,
      scoops: [
        this.server.create('scoop'),
        this.server.create('scoop', { description: '80s Night' }),
      ]
    });

    this.server.create('business', {
      region,
      scoops: this.server.createList('scoop', 2)
    });

    this.server.create('business', {
      region: otherRegion,
      scoops: this.server.createList('scoop', 3)
    });

    this.region = region;
    this.otherRegion = otherRegion;
    this.url = `/region/${this.region.id}/scoops`;
  });

  test('I can view all scoops for the active region', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('scoop-listing')).exists({ count: 4 });
  });

  test('I can switch my active region and see all scoops updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('scoop-listing')).exists({ count: 4 });

    await click(testId('select-region-dd-trigger'));
    await click(`${testId('select-region', this.otherRegion.id)} button`);

    assert.equal(currentURL(), `/region/${this.otherRegion.id}/scoops`);
    assert.dom(testId('scoop-listing')).exists({ count: 3 });
  });

  test('I can search and see results updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('scoop-listing')).exists({ count: 4 });

    await focus(testId('search'));
    await fillIn(testId('search'), '80s Night');
    await blur(testId('search'));

    assert.dom(testId('scoop-listing')).exists({ count: 1 });
  });
});
