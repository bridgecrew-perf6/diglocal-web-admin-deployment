import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { authenticateSession, invalidateSession } from 'ember-simple-auth/test-support';

module('Acceptance | Application Session', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('I am redirected to index if I am already logged in', async function(assert) {
    await authenticateSession();
    await visit('/');

    assert.equal(currentURL(), '/businesses');
  });

  test('I am redirected to login route if I am not logged in', async function(assert) {
    await invalidateSession();
    await visit('/');

    assert.equal(currentURL(), '/login');
  });
});
