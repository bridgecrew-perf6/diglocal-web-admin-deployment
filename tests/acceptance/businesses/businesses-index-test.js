import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | Businesses | Index', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    this.server.createList('business', 5, { region });

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
