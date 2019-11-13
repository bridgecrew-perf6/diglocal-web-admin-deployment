import Component from '@ember/component';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  firebase: service(),
  store: service(),
  totalFiles: 0,
  totalFilesUploaded: 0,
  uploadTasks: A(),
  uploadStatuses: A(),

  didInsertElement() {
    this._super(...arguments);
    set(this, 'uploadStatuses', A());
  },

  actions: {
    didSelectFiles(files) {
      let firebase = get(this, 'firebase');
      let storageRef = firebase.app().storage().ref();
      let uploadStatuses = get(this, 'uploadStatuses')

      set(this, 'totalFiles', files.length);

      for (let file of files) {
        let status = EmberObject.create({
          preview: '',
          progress: 0,
          state: ''
        });

        uploadStatuses.addObject(status);

        resizeImageToSpecificWidth(file, 128, function(data) {
          set(status, 'preview', data);
        });
        let uuid = a=>a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid);
        let uploadTask = storageRef.child(`${get(this, 'pathName')}/${uuid()}/${file.name}`).put(file, { cacheControl: 'public,max-age=31536000' });

        uploadTask.on('state_changed',
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            set(status, 'progressText', `Upload is ${Math.round(progress * 100) / 100} % done`);
            set(status, 'progress', progress);
            set(status, 'state', uploadTask.snapshot.state);
          }, (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
          }
        }, () => {
          set(status, 'state', uploadTask.snapshot.state);
          set(status, 'fileUrl', uploadTask.snapshot.downloadURL);
          this.incrementProperty('totalFilesUploaded');

          let handler = get(this, 'uploadCompleteAction');

          if (handler) {
            handler(uploadTask.snapshot);
          }

          if( get(this, 'totalFilesUploaded') === files.length) {
            handler = get(this, 'onAllFilesUploadComplete');
            if (handler) {
              handler(uploadStatuses);
            }

            if (get(this, 'resetAfterUpload')) {
              set(this, 'uploadStatuses', A());
            }
          }
        });
      }
    }
  }
});

function resizeImageToSpecificWidth(file, max, cb) {
  var data;
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      if (img.width > max) {
        var oc = document.createElement('canvas'),
            octx = oc.getContext('2d');

        oc.width = img.width;
        oc.height = img.height;
        octx.drawImage(img, 0, 0);
        if( img.width > img.height) {
          oc.height = (img.height / img.width) * max;
          oc.width = max;
        } else {
          oc.width = (img.width / img.height) * max;
          oc.height = max;
        }
        octx.drawImage(oc, 0, 0, oc.width, oc.height);
        octx.drawImage(img, 0, 0, oc.width, oc.height);
        data = oc.toDataURL();
      } else {
        let oc = document.createElement('canvas');
        data = oc.toDataURL();
      }
      cb(data);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}
