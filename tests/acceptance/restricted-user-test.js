import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { authenticateSession, currentSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import setupRestrictedUserTest from 'diglocal-manage/tests/helpers/setup-restricted-user-test';

module('Acceptance | Restricted User', function(hooks) {
  setupRestrictedUserTest(hooks);

  test('As a normal user with no businesses and no admin privileges, I cannot access app content even if authenticated', async function(assert) {
    await authenticateSession();
    assert.ok(currentSession().isAuthenticated, 'Session is valid as if normal user logged in with their social credentials, for example');

    await visit('/');
    assert.dom(testId('forbidden-alert')).exists();
    assert.dom(testId('nav-link')).doesNotExist();
    assert.dom(testId('forbidden-user-email')).hasText(this.currentUser.email);

    await click(testId('confirm-forbidden-alert'));
    assert.notOk(currentSession().isAuthenticated, 'Session is invalid');
  });

  test('If the forbidden alert appears, my session is invalidated upon closing the forbidden alert', async function(assert) {
    await authenticateSession();
    assert.ok(currentSession().isAuthenticated);

    await visit('/');
    assert.dom(testId('forbidden-alert')).exists();

    await click(testId('close-modal'));
    assert.dom(testId('forbidden-alert')).doesNotExist();
    assert.notOk(currentSession().isAuthenticated, 'Session is invalid');
  });

  test('If the forbidden alert appears, my session is invalidated upon confirming the forbidden alert', async function(assert) {
    await authenticateSession();
    assert.ok(currentSession().isAuthenticated);

    await visit('/');
    assert.dom(testId('forbidden-alert')).exists();

    await click(testId('confirm-forbidden-alert'));
    assert.notOk(currentSession().isAuthenticated, 'Session is invalid');
  });
});
