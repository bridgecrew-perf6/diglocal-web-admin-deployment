import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { authenticateSession, invalidateSession, currentSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';

module('Acceptance | Application Session', function(hooks) {
  setupAdminUserTest(hooks);

  hooks.beforeEach(function() {
    let region = this.server.create('region');
    this.server.createList('business', 2, { region: region});

    this.region = region;
  });

  test('I am redirected to index if I am already logged in', async function(assert) {
    await authenticateSession();
    await visit('/');

    assert.equal(currentURL(), `/region/${this.region.id}/businesses`);
  });

  test('I am redirected to login route if I am not logged in', async function(assert) {
    await invalidateSession();
    await visit('/');

    assert.equal(currentURL(), '/login');
  });

  test('I cannot visit an nested authenticated route if I am not logged in', async function(assert) {
    await invalidateSession();
    await visit(`/region/${this.region.id}/scoops`);

    assert.equal(currentURL(), '/login');
  });

  test('The current user is loaded with the app if I am authenticated', async function(assert) {
    await authenticateSession();
    await visit('/');

    assert.equal(currentURL(), `/region/${this.region.id}/businesses`);
    let currentUserService = this.owner.lookup('service:current-user');
    assert.equal(currentUserService.user.id, this.currentUser.id);
  });

  test('The current user is not persisted after logout', async function(assert) {
    await authenticateSession();
    await visit('/');

    assert.equal(currentURL(), `/region/${this.region.id}/businesses`);
    let currentUserService = this.owner.lookup('service:current-user');
    assert.equal(currentUserService.user.id, this.currentUser.id);

    await click(testId('current-user-dropdown'));
    await click(`${testId('logout')} button`);

    assert.notOk(currentSession().isAuthenticated, 'Session is invalid');
    assert.notOk(currentUserService.user);
  });

  test('I can logout and my session is invalidated', async function(assert) {
    await authenticateSession();
    await visit('/');

    assert.equal(currentURL(), `/region/${this.region.id}/businesses`);
    assert.ok(currentSession().isAuthenticated, 'Session is valid');

    await click(testId('current-user-dropdown'));
    await click(`${testId('logout')} button`);

    /* NOTE:
     * In test environment, ember-simple-auth's sessionInvalidationSucceeded method does NOT redirect to login
     * immediately upon invalidation. In non-test environments, the window location is replaced with the app root URL.
     * We can only assert that the session itself is invalid.
    */
    assert.notOk(currentSession().isAuthenticated, 'Session is invalid');
  });

});
