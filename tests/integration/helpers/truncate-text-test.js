import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | truncate-text', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it truncates to limit specified', async function(assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{truncate-text inputValue limit=1}}`);

    assert.equal(this.element.textContent.trim(), '1...');
  });
});
