import JSONAPISerializer from '@ember-data/serializer/json-api';
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

export default class ApplicationSerializer extends JSONAPISerializer {
  @service permissions;

  normalizeResponse() {
    let normalizedDocument = super.normalizeResponse(...arguments);

    this.permissions.updatePermissions(get(normalizedDocument, 'meta.attributePermissions'));

    return normalizedDocument;
  }

  keyForAttribute(attr) {
    return camelize(attr);
  }

  keyForRelationship(attr) {
    return camelize(attr);
  }

  serializeAttribute(snapshot, json, key, attributes) {
    if (COMMON_READ_ONLY_KEYS.includes(key)) {
      return;
    }

    if (!this.permissions.permissionToModify(key, snapshot.record)) {
      return;
    }

    return super.serializeAttribute(snapshot, json, key, attributes);
  }

  serializeBelongsTo(snapshot, json, relationship) {
    if (get(relationship, 'options.readOnly')) {
      return;
    }

    if (!this.permissions.permissionToModify(relationship.key, snapshot.record)) {
      return;
    }

    return super.serializeBelongsTo(snapshot, json, relationship);
  }
}
