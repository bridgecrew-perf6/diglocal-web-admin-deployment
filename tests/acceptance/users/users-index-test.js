import { module, test } from 'qunit';
import { visit, currentURL, fillIn, focus, blur } from '@ember/test-helpers';
import { testId } from 'diglocal-manage/tests/helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | Users | Index', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;

    this.server.createList('user', 2, 'adminUser');
    this.server.createList('user', 3);
    this.server.create('user', { email: 'julia@example.com' })

    this.region = region;
    this.url = `/region/${this.region.id}/users`;
  });

  test('I can view all users', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('user-listing')).exists({ count: 7 });
  });

  test('I can search and see results updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('user-listing')).exists({ count: 7 });

    await focus(testId('search'));
    await fillIn(testId('search'), 'julia@example.com');
    await blur(testId('search'));

    assert.dom(testId('user-listing')).exists({ count: 1 });
  });
});
