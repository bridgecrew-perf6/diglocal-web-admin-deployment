import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | hh-mm-ss', function(hooks) {
  setupTest(hooks);

  const dateString = '2020-05-01T12:00:00.000-07:00';
  const date = new Date(dateString);

  test('it deserializes to date', function(assert) {
    let transform = this.owner.lookup('transform:hh-mm-ss');
    assert.equal(transform.deserialize(dateString).toISOString(), date.toISOString());
  });

  test('if value is not present, deserialized value is null', function(assert) {
    let transform = this.owner.lookup('transform:hh-mm-ss');
    assert.equal(transform.deserialize(), null);
  });

  /* This would occur if we have edited the time, in which case we are setting the value in format HH:mm:ss */
  test('it serializes to format HH:mm:ss if value to serialize matches HH:mm:ss format', function(assert) {
    let transform = this.owner.lookup('transform:hh-mm-ss');
    assert.equal(transform.serialize('12:00:00'), '12:00:00');
  });

  /* This would occur if the values sent from server have not been edited at all */
  test('it serializes to ISO format if value to serialize is date object (therefore unedited)', function(assert) {
    let transform = this.owner.lookup('transform:hh-mm-ss');
    assert.equal(transform.serialize(date), date.toISOString());
  });

  test('if value is null, serialized value remains null', function(assert) {
    let transform = this.owner.lookup('transform:hh-mm-ss');
    assert.equal(transform.serialize(null), null);
  });
});
