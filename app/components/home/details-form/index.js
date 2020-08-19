import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task, timeout, all } from 'ember-concurrency';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';
import config from 'diglocal-manage/config/environment';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class DetailsForm extends Component {
  @service ajax;
  @service currentUser;
  @service notifications;
  @service regions;
  @service router;
  @service store;

  @tracked showDestroyModal = false;
  @tracked showPhotoDestroyModal = false;
  @tracked photoErrorMessage = null;
  @tracked showUploadModal = false;
  @tracked selectedPhotos = [];

  rollbackModel() {
    if (this.args.rollbackModel) {
      return this.args.rollbackModel();
    }
    this.selectedPhotos = [];
  }

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
    super.willDestroy(...arguments);
  }

  @(task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let regionId = this.regions.activeRegion.id;
    let filter = Object.assign({}, { search, region: regionId });
    filter = removeEmpty(filter);
    return this.store.query('business', { filter });
  }).restartable())
  searchBusinesses;

  @task(function*() {
    let model = yield this.args.model.save();
    this.isEditing = false;
    if (this.args.afterSave) {
      return this.args.afterSave(model);
    }
    this.notifications.success('Saved successfully!');
    return model;
  })
  saveTask;

  @task(function*() {
    yield this.args.model.deleteRecord();
    yield this.args.model.save();
    this.router.transitionTo('authenticated.region.businesses.view.homes.index');
  })
  deleteTask;

  @task(function*(items) {
    try {
      items.invoke('deleteRecord');
      yield all(items.invoke('save'));
      this.selectedPhotos.clear();
    } catch(e) {
      if (this.selectedPhotos.length) {
        this.selectedPhotos.forEach(model => model.rollbackAttributes());
      }
      this.photoErrorMessage = 'Oops! An error occurred. Unable to delete all selected photos.';
    }
    this.showPhotoDestroyModal = false;
  })
  deletePhotos;

  @task(function*() {
    /**
    * This is weird and problematic right now...need to determine strategy for avatar vs digitalAsset
    */
    if (this.selectedPhotos.length === 1) {
      let image = this.selectedPhotos[0];
      this.args.model.avatar = image;
      yield this.args.model.save();
      this.selectedPhotos = [];
    }
  })
  promoteHeroImage;

  @action
  save() {
    return this.saveTask.perform();
  }

  @action
  cancel() {
    return this.rollbackModel();
  }

  @action
  delete() {
    return this.deleteTask.perform();
  }

  @action
  cancelUpload() {
    this.showUploadModal = false;
  }

  @action
  updateLocation(placeDetails) {
    this.args.model.geoLocation = [
      placeDetails.geometry.location.lat(),
      placeDetails.geometry.location.lng()
    ];
  }

  @action
  promoteHero() {
    return this.promoteHeroImage.perform();
  }

  @action
  deleteSelectedPhotos() {
    this.photoErrorMessage = null;
    this.deletePhotos.perform(this.selectedPhotos);
  }

  @action
  clearAllSelectedPhotos() {
    this.selectedPhotos = [];
  }

  @action
  async onFileUploadComplete(snapshot) {
    try {
      let asset = await this.createDigitalAssetFromSnapsnot(snapshot);
      // Save the digital asset and add it to the home model,
      // which we will save once all uploads complete (onAllFilesUploadComplete)
      await asset.save();
      this.args.model.digitalAssets.addObject(asset);
    } catch(e) {
      // Throw error for handling by uploader
      throw e;
    }
  }

  @action
  async onAllFilesUploadComplete() {
    try {
      // Save all of the digitalAssets that have been added to the model at once
      await this.args.model.save();
      this.showUploadModal = false;
    } catch(e) {
      // Throw error for handling by uploader
      throw e;
    }
  }

  async createDigitalAssetFromSnapsnot(snapshot) {
    let digitalAsset = this.store.createRecord('digitalAsset', {
      bucket: snapshot.metadata.bucket,
      filename: snapshot.metadata.name,
      fullPath: snapshot.metadata.fullPath,
      size: snapshot.metadata.size,
      contentType: snapshot.metadata.contentType,
      raw: snapshot.metadata
    });
    
    return await this.generateThumbnailsForAsset(digitalAsset);
  }

  async generateThumbnailsForAsset(digitalAsset) {
    let thumbnails = await this.ajax.post(`${config.firebase.cloudFunctions}/generateThumbnails`, {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        data: Object.assign(digitalAsset.raw, { sizes: ['256_outside', '512_outside', '1024_outside'] })
      }
    });

    digitalAsset.downloadUrls = thumbnails.result.downloadURLs;
    return digitalAsset;
  }

}
