import Service from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { tracked } from '@glimmer/tracking';

export default class RegionsService extends Service {
  @storageFor('active-region') activeRegionStorage;

  constructor() {
    super(...arguments);
    this.regions = [];
  }

  @tracked activeRegion = null;
}
