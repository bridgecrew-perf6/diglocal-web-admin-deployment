import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | Businesses | Index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    let region = this.server.create('region');
    this.server.createList('business', 5, { region: region});

    this.region = region;
    this.url = `/region/${this.region.id}/businesses`;
  });

  test('I can view all businesses', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom('[data-test-id=business-list-row]').exists({ count: 5 });
  });

});
