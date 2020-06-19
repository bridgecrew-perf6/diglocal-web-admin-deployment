import { module, test } from 'qunit';
import { visit, click, currentURL, currentRouteName } from '@ember/test-helpers';
import { authenticateSession, currentSession } from 'ember-simple-auth/test-support';
import { testId, testLinkTo, asyncForEach } from 'diglocal-manage/tests/helpers';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

const expectedLinks = [
  'authenticated.region.businesses',
  'authenticated.region.analytics',
  'authenticated.region.scoops',
  'authenticated.region.lists',
  'authenticated.region.users',
  'authenticated.region.newsletters',
  'authenticated.region.site-settings',
];

module('Acceptance | Header | Admin User', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region2 = this.server.create('region');
    this.expectedLinks = expectedLinks;
    this.region2 = region2;
  });

  test('I see admin nav links in the header', async function(assert) {
    assert.expect(this.expectedLinks.length + 2);
    await authenticateSession();
    await visit('/');

    assert.equal(currentURL(), `/region/${this.activeRegion.id}/businesses`);
    assert.dom(testId('nav-link')).exists({ count: 7 });

    this.expectedLinks.forEach((route) => {
      assert.dom(testLinkTo(route)).exists();
    });
  });

  test('I can click on each nav link and be routed as expected', async function(assert) {
    assert.expect(this.expectedLinks.length * 2);

    await authenticateSession();
    await visit('/');

    await asyncForEach(this.expectedLinks, async (route) => {
      await click(testLinkTo(route));
      assert.equal(currentRouteName(), `${route}.index`, 'Link goes to correct route');
      assert.ok(currentURL().split('/').includes(this.activeRegion.id), 'Active region exists correctly in url');
    });
  });

  test('I can change my active region and nav links are updated', async function(assert) {
    assert.expect(this.expectedLinks.length * 2);

    await authenticateSession();
    await visit('/');

    await click(testId('select-region-dd-trigger'));
    await click(`${testId('select-region', this.region2.id)} button`);

    await asyncForEach(this.expectedLinks, async (route) => {
      await click(testLinkTo(route));
      assert.equal(currentRouteName(), `${route}.index`, 'Link goes to correct route');
      assert.ok(currentURL().split('/').includes(this.region2.id), 'Active region exists correctly in url');
    });
  });

  test('I can logout and see no nav links', async function(assert) {
    await authenticateSession();
    await visit('/');

    await click(testId('current-user-dd-trigger'));
    await click(testId('logout'));

    assert.dom(testId('nav-link')).doesNotExist();
    assert.notOk(currentSession().isAuthenticated, 'Session is invalid');
  });
});
