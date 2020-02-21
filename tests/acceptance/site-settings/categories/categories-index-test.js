import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, focus, blur } from '@ember/test-helpers';
import { testId } from 'diglocal-manage/tests/helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | Site Settings | Categories | Index', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    let otherRegion = this.server.create('region');

    this.server.createList('category', 3, { region });
    this.server.create('category', { region, longName: 'Best Ever' });
    this.server.createList('category', 2, { region: otherRegion });

    this.region = region;
    this.otherRegion = otherRegion;
    this.url = `/region/${this.region.id}/settings/categories`;
  });

  test('I can view all categories', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('category-listing')).exists({ count: 4 });
  });

  test('I can switch my active region and see all categories updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('category-listing')).exists({ count: 4 });

    await click(testId('select-region-dd-trigger'));
    await click(`${testId('select-region', this.otherRegion.id)} button`);

    assert.equal(currentURL(), `/region/${this.otherRegion.id}/settings/categories`);
    assert.dom(testId('category-listing')).exists({ count: 2 });
  });

  test('I can search and see results updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('category-listing')).exists({ count: 4 });

    await focus(testId('search'));
    await fillIn(testId('search'), 'Best Ever');
    await blur(testId('search'));

    assert.dom(testId('category-listing')).exists({ count: 1 });
  });

  test('I can create a new category from the categories index', async function(assert) {
    await authenticateSession();
    await visit(this.url);
    assert.equal(currentURL(), this.url);

    await click(testId('add-new-category'));
    assert.equal(currentURL(), `/region/${this.region.id}/settings/categories/new`);
  });
});
