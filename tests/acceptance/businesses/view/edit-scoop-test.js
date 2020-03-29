import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | View Business | Scoops | Edit', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    this.business = this.server.create('business', 'withLocation', { region });
    this.region = region;
  });

  module('View scoop', function(hooks) {
    hooks.beforeEach(function() {
      this.scoop = this.server.create('scoop', {
        business: this.business,
        description: 'Sample Sale',
        fineText: 'Prices up to 80% off on all items',
        isDeal: true
      });
      this.url = `/region/${this.region.id}/businesses/${this.business.id}/scoops/${this.scoop.id}`;
    });

    test('I can view expected scoop fields', async function(assert) {
      await authenticateSession();
      await visit(this.url);

      assert.equal(currentURL(), this.url);

      let detailsForm = find(testId('scoop-details-form'));
      assert.dom(detailsForm).exists();

      assert.dom(testId('save-scoop')).exists();
    });
  });

});
