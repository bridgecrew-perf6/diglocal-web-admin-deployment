import {
  module,
  test
} from 'qunit';
import {
  visit,
  click,
  currentURL,
  currentRouteName
} from '@ember/test-helpers';
import {
  authenticateSession,
  currentSession
} from 'ember-simple-auth/test-support';
import {
  testId,
  testLinkTo,
  asyncForEach
} from 'diglocal-manage/tests/helpers';
import setupBusinessOwnerTest from 'diglocal-manage/tests/helpers/setup-business-owner-test';

const expectedLinks = [
  'authenticated.manage.business.index',
  'authenticated.manage.business.locations',
  'authenticated.manage.business.photos',
  'authenticated.manage.business.scoops.index',
  'authenticated.manage.business.users',
  'authenticated.manage.business.scoops.new'
];

module('Acceptance | Header | Single Business Owner User', function (hooks) {
  setupBusinessOwnerTest(hooks);

  hooks.beforeEach(function () {
    this.expectedLinks = expectedLinks;
  });

  test('I see single business owner nav links in the header', async function (assert) {
    assert.expect(this.expectedLinks.length + 2);
    await authenticateSession();
    await visit('/');

    assert.equal(currentURL(), `/manage/business/${this.business.id}`);
    assert.dom(testId('nav-link')).exists({
      count: this.expectedLinks.length
    });

    this.expectedLinks.forEach((route) => {
      assert.dom(testLinkTo(route)).exists();
    });
  });

  test('I can click on each nav link and be routed as expected', async function (assert) {
    assert.expect(this.expectedLinks.length * 2);

    await authenticateSession();
    await visit('/');

    await asyncForEach(this.expectedLinks, async (route) => {
      await click(testLinkTo(route));
      assert.equal(currentRouteName(), route, 'Link goes to correct route');
      assert.ok(currentURL().split('/').includes(this.business.id), 'Active business exists correctly in url');
    });
  });

  test('I can logout and see no nav links', async function (assert) {
    await authenticateSession();
    await visit('/');

    await click(testId('current-user-dd-trigger'));
    await click(testId('logout'));

    assert.dom(testId('nav-link')).doesNotExist();
    assert.notOk(currentSession().isAuthenticated, 'Session is invalid');
  });
});
