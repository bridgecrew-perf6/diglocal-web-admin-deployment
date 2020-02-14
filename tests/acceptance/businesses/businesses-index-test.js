import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, focus, blur } from '@ember/test-helpers';
import { testId } from 'diglocal-manage/tests/helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | Businesses | Index', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    let otherRegion = this.server.create('region');
    this.server.create('business', { region, name: 'Crunchy Bananas' });
    this.server.createList('business', 2, { region });
    this.server.createList('business', 1, { region: otherRegion });

    this.region = region;
    this.otherRegion = otherRegion;
    this.url = `/region/${this.region.id}/businesses`;
  });

  test('I can view all businesses', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('business-listing')).exists({ count: 3 });
  });

  test('I can switch my active region and see all businesses updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('business-listing')).exists({ count: 3 });

    await click(testId('select-region-dd-trigger'));
    await click(`${testId('select-region', this.otherRegion.id)} button`);

    assert.equal(currentURL(), `/region/${this.otherRegion.id}/businesses`);
    assert.dom(testId('business-listing')).exists({ count: 1 });
  });

  test('I can search and see results updated', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);
    assert.dom(testId('business-listing')).exists({ count: 3 });

    await focus(testId('search'));
    await fillIn(testId('search'), 'Crunchy Bananas');
    await blur(testId('search'));

    assert.dom(testId('business-listing')).exists({ count: 1 });
  });

  test('Business category filter options are region specific', async function(assert) {
    this.server.createList('category', 5, { region: this.region });
    this.server.createList('category', 2, { region: this.otherRegion });

    await authenticateSession();
    await visit(this.url);
    assert.equal(currentURL(), this.url);

    await click(testId('category-filter-dd-trigger'));
    assert.dom(testId('category-filter-option')).exists({ count: 5 });

    await click(testId('select-region-dd-trigger'));
    await click(`${testId('select-region', this.otherRegion.id)} button`);
    assert.equal(currentURL(), `/region/${this.otherRegion.id}/businesses`);

    await click(testId('category-filter-dd-trigger'));
    assert.dom(testId('category-filter-option')).exists({ count: 2 });
  });

  test('I can filter businesses by category', async function(assert) {
    let categories = this.server.createList('category', 5, { region: this.region });
    this.server.create('business', {
      region: this.region,
      categories: categories.slice(0, 1)
    });

    this.server.create('business', {
      region: this.region,
      categories: categories.slice(0, 2)
    });

    await authenticateSession();
    await visit(this.url);
    assert.equal(currentURL(), this.url);
    assert.dom(testId('business-listing')).exists({ count: 5 });

    await click(testId('category-filter-dd-trigger'));
    await click(testId('category', categories[1].id));
    assert.dom(testId('business-listing')).exists({ count: 1 });

    await click(testId('category', categories[0].id));
    assert.dom(testId('business-listing')).exists({ count: 2 });

    await click(testId('clear-filters'));
    assert.dom(testId('business-listing')).exists({ count: 5 });
  });
});
