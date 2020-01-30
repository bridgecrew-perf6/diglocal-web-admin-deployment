import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | Businesses | Index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.createList('business', 5);
  });

  test('I can view all businesses', async function(assert) {
    await authenticateSession();
    await visit('/businesses');

    assert.equal(currentURL(), '/businesses');
    assert.dom('[data-test-id=business-list-row]').exists({ count: 5 });
    await this.pauseTest()
  });

});
