import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  pathName: '/assets/images/',
  uploader: service(),

  actions: {
    uploadComplete(details) {
      get(this, 'uploader').handleUploadComplete.perform(details, (asset) => {
        get(this, 'model').save();
      });
    },
  }
});
