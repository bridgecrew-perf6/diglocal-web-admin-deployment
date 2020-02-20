import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | format-event-date', function(hooks) {
  setupRenderingTest(hooks);

  test('it formats date', async function(assert) {
    this.set('inputValue', '1992-10-10');

    await render(hbs`{{format-event-date inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Saturday, Oct 10th 1992');
  });
});
