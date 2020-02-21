import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { testId } from 'diglocal-manage/tests/helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupAdminUserTest from 'diglocal-manage/tests/helpers/setup-admin-user-test';
import setupActiveRegion from 'diglocal-manage/tests/helpers/setup-active-region';

module('Acceptance | Site Settings | Categories | New', function(hooks) {
  setupAdminUserTest(hooks);
  setupActiveRegion(hooks);

  hooks.beforeEach(function() {
    let region = this.activeRegion;
    this.region = region;
    this.url = `/region/${this.region.id}/settings/categories/new`;
  });

  test('I can create a new category', async function(assert) {
    await authenticateSession();
    await visit(this.url);

    assert.equal(currentURL(), this.url);

    await fillIn(testId('longName-field'), 'Beauty & Hair');
    await fillIn(testId('shortName-field'), 'beauty-hair');
    await fillIn(testId('metaTitle-field'), 'Beauty & Hair Scoops');
    await fillIn(testId('metaH1-field'), 'The Best Beauty & Hair Scoops');
    await fillIn(testId('metaDescription-field'), 'Beauty & Hair Scoops and even more');
    await click(testId('save-category'));

    let created = this.server.schema.categories.first();
    assert.equal(created.regionId, this.region.id, 'Category is created with relationship to region');
    assert.ok(created.longName, 'Category has longName');
    assert.ok(created.shortName, 'Category has shortName');
    assert.ok(created.metaTitle, 'Category has metaTitle');
    assert.ok(created.metaH1, 'Category has metaH1');
    assert.ok(created.metaDescription, 'Category has metaDescription');

    assert.equal(currentURL(), `/region/${this.region.id}/settings/categories/${created.id}`);
  });
});
