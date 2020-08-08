import Component from '@glimmer/component';
import config from 'diglocal-manage/config/environment';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class HomeNewFormInitialSetupComponent extends Component {
  @service ajax;
  @service currentUser;
  @service regions;
  @service store;

  @(task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let regionId = this.regions.activeRegion.id;
    let filter = Object.assign({}, { search, region: regionId });
    filter = removeEmpty(filter);
    return this.store.query('business', { filter });
  }).restartable())
  searchBusinesses;

  @action
  async onFileUploadComplete(details) {
    let asset = this.store.createRecord('digitalAsset', {
      bucket: details.metadata.bucket,
      downloadUrls: details.metadata.downloadURLs,
      filename: details.metadata.name,
      fullPath: details.metadata.fullPath,
      size: details.metadata.size,
      contentType: details.metadata.contentType,
      raw: details.metadata
    });

    this.ajax.post(`${config.firebase.cloudFunctions}/generateThumbnails`, {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        data: Object.assign(details.metadata, { sizes: ['256x256'] })
      }
    });

    await asset.save();
    this.args.model.digitalAssets.addObject(asset);
    this.args.model.save();
  }
}
