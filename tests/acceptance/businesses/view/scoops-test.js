import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, blur, focus } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId, testLinkTo } from 'diglocal-manage/tests/helpers';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | View Business | Scoops Index', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    this.business = this.server.create('business', 'withLocation', { region });
    this.server.create('business', 'withLocation', 'withScoops', { region });
    this.region = region;
    this.url = `/region/${this.region.id}/businesses/${this.business.id}/scoops`;
  });

  module('View all', function(/*hooks*/) {
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

    test('I see click a listing and view details for a scoop', async function(assert) {
      let scoop = this.server.create('scoop', { business: this.business });
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('scoop-listing')).exists({ count: 1 });

      await click(testId('view-scoop', scoop.id));
      assert.equal(currentURL(), `/region/${this.region.id}/businesses/${this.business.id}/scoops/${scoop.id}`);
    });

    test('I can create a new scoop from the scoops index', async function(assert) {
      this.server.createList('scoop', 2, { business: this.business });
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('scoop-listing')).exists({ count: 2 });

      await click(testId('add-new-scoop'));
      assert.equal(currentURL(), `/region/${this.region.id}/businesses/${this.business.id}/scoops/new`);
      assert.dom(testId('selected-business-name')).hasText(this.business.name);
    });

    test('I can search and see results updated', async function(assert) {
      this.server.createList('scoop', 3, { business: this.business });
      this.server.create('scoop', { description: '80s Night', business: this.business }),
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);
      assert.dom(testId('scoop-listing')).exists({ count: 4 });

      await focus(testId('search'));
      await fillIn(testId('search'), '80s Night');
      await blur(testId('search'));

      assert.dom(testId('scoop-listing')).exists({ count: 1 });
    });
  });

});
