import { readOnly } from '@ember/object/computed';
import { attr, hasMany } from '@ember-data/model';
import Trackable from './trackable';
import { set, getProperties } from '@ember/object';
import { isBlank } from '@ember/utils';

export default class DigitalAsset extends Trackable  {
  @attr() bucket;
  @attr() contentType;
  @attr() downloadUrls;
  @attr() filename;
  @attr() fullPath;
  @attr() raw;
  @attr() name;
  @attr() path;
  @attr() publishedAt;
  @attr() publishedState;
  @attr() size;
  @attr() slug;
  @attr() tags;
  @attr() uuid;

  /*************************
  **  Relationships       **
  *************************/

  @hasMany('attachments') attachments;

  /*************************
  **  Computed Properties **
  *************************/

  get presentableName() {
    let { name, filename } = getProperties(this, 'name', 'filename');

    return isBlank(name) ? filename : name;
  }

  set presentableName(value) {
    return set(this, 'name', value);
  }

  @readOnly('downloadUrls.original') assetUrl;
  @readOnly('downloadUrls.original') assetSrcOriginal;
  @readOnly('downloadUrls.64_outside') assetSrc64;
  @readOnly('downloadUrls.128_outside') assetSrc128;
  @readOnly('downloadUrls.256_outside') assetSrc256;
  @readOnly('downloadUrls.512_outside') assetSrc512;
  @readOnly('downloadUrls.1024_outside') assetSrc1024;
  @readOnly('downloadUrls.2048_outside') assetSrc2048;
}
