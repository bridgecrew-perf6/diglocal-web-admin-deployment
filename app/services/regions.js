import Service from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default class RegionsService extends Service {
  @storageFor('regions')
  regions;

  constructor() {
    super(...arguments);
    this.regions = [];
  }

  activeRegion = null;


}
