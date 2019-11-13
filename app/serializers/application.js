import DS from 'ember-data';
import { camelize } from '@ember/string';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

const COMMON_READ_ONLY_KEYS = [
  'createdAt',
  'createdBy',
  'deletedAt',
  'updatedAt',
  'updatedBy'
];

export default DS.JSONAPISerializer.extend({
  permissions: service('permissions'),

  normalizeResponse() {
    let normalizedDocument = this._super(...arguments);

    get(this, 'permissions').updatePermissions(get(normalizedDocument, 'meta.attributePermissions'));

    return normalizedDocument;
  },

  keyForAttribute: function(attr) {
    return camelize(attr);
  },

  keyForRelationship: function(attr) {
    return camelize(attr);
  },

  serializeAttribute(snapshot, json, key, attributes) {
    if (COMMON_READ_ONLY_KEYS.includes(key)) {
      return;
    }

    if (!get(this, 'permissions').permissionToModify(key, snapshot.record)) {
      return;
    }

    return this._super(snapshot, json, key, attributes);
  },

  serializeBelongsTo(snapshot, json, relationship) {
    if (get(relationship, 'options.readOnly')) {
      return;
    }

    if (!get(this, 'permissions').permissionToModify(relationship.key, snapshot.record)) {
      return;
    }

    return this._super(snapshot, json, relationship);
  }
});