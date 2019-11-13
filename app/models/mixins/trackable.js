import DS from 'ember-data';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  deletedAt: DS.attr(),
  createdAt: DS.attr(),
  createdBy: DS.attr(),
  updatedAt: DS.attr(),
  updatedBy: DS.attr()
});
