import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId, testLinkTo } from 'diglocal-manage/tests/helpers';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | View Business | Scoops', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    this.business = this.server.create('business', 'withLocation', { region });
    this.server.create('business', 'withLocation', 'withScoops', { region });
    this.region = region;
    this.url = `/region/${this.region.id}/businesses/${this.business.id}/scoops`;
  });

  module('View scoops', function(/*hooks*/) {
    test('I see only scoops for the active business', async function(assert) {
      this.server.createList('scoop', 2, { business: this.business });
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('scoop-listing')).exists({ count: 2 });

      await click(testLinkTo('authenticated.region.scoops'));
      assert.equal(currentURL(), `/region/${this.region.id}/scoops`);
      assert.dom(testId('scoop-listing')).exists({ count: 5 }, 'When I visit main scoops route, I see all scoops');
      assert.equal(this.server.schema.scoops.all().models.length, 5);
    });
  });

  // module('Add scoop', function(/*hooks*/) {
  // });

  // module('Edit scoops', function(hooks) {
  //   hooks.beforeEach(function() {
  //   });
  // });

});
