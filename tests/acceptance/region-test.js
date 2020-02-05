import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { authenticateSession, invalidateSession, currentSession } from 'ember-simple-auth/test-support';
import { testId } from 'diglocal-manage/tests/helpers';

module('Acceptance | Region', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    let asheville = this.server.create('region', {
      name: 'Asheville',
      longName: 'Asheville, NC'
    });

    let boone = this.server.create('region', {
      name: 'Boone',
      longName: 'Boone, NC'
    });

    this.server.createList('business', 2, { region: boone });
    this.server.createList('business', 5, { region: asheville });

    this.asheville = asheville;
    this.boone = boone;
  });

  test('', async function(assert) {
    await authenticateSession();
    let adminUser = this.server.create('user', 'adminUser');
    let session = currentSession();
    session.set('currentUser', adminUser);
    await visit(`/region/${this.asheville.id}/businesses`);
    console.log(session);

    assert.equal(currentURL(), `/region/${this.asheville.id}/businesses`);
  });

});
