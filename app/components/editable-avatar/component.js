import Component from '@ember/component';
// import { task } from 'ember-concurrency';
// import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';

// TODO: This needs to be updated for Dig Local profileImage upload flow and attrs

export default Component.extend({
  uploader: service(),

  pathName: '/assets/images/',
  keyForAvatar: 'avatar',
  isReadonly: false,
  isEditing: false,

  // canEdit: computed('isReadonly', 'isEditing', function() {
  //   return !this.isReadonly && !this.isEditing;
  // }),
  //
  // editAvatar: task(function*() {
  //   set(this, 'isEditing', true);
  //   if (this.model.get('isNew')) {
  //     yield this.model.save();
  //   }
  // }),
  //
  // onUploadComplete: task(function*(details) {
  //   yield get(this, 'uploader').handleUploadComplete.perform(details, (asset) => {
  //     set(this, `model.${this.keyForAvatar}`, asset);
  //     get(this, 'model').save();
  //   });
  //   set(this, 'isEditing', false);
  // }),
  //
  // actions: {
  //   uploadComplete(details) {
  //     this.onUploadComplete.perform(details);
  //   },
  // }
});
