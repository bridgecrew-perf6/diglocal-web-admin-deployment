import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

// TODO: This needs to be updated for Dig Local profileImage upload flow and attrs

@classic
export default class EditableAvatar extends Component {
  @service
  uploader;

  pathName = '/assets/images/';
  keyForAvatar = 'avatar';
  isReadonly = false;

  isEditing = false;

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
}
