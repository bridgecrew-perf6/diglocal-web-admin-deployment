import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | hh-mm-ss', function(hooks) {
  setupTest(hooks);

  test('it deserializes to time format HH:mm:ss', function(assert) {
    let transform = this.owner.lookup('transform:hh-mm-ss');
    assert.equal(transform.deserialize('2020-05-01T12:00:00.000-07:00'), '12:00:00');
  });

  test('if value is not present, deserialized value is null', function(assert) {
    let transform = this.owner.lookup('transform:hh-mm-ss');
    assert.equal(transform.deserialize(), null);
  });

  test('it sends serialized values in deserialized format HH:mm:ss as expected', function(assert) {
    let transform = this.owner.lookup('transform:hh-mm-ss');
    assert.equal(transform.serialize('12:00:00'), '12:00:00');
  });

  test('if value is null, serialized value remains null', function(assert) {
    let transform = this.owner.lookup('transform:hh-mm-ss');
    assert.equal(transform.serialize(null), null);
  });
});
