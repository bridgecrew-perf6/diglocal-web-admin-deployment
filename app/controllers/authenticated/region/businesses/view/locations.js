import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthenticatedRegionBusinessesViewLocationsController extends Controller {
  @service store;
  @service regions;

  @action
  rollbackModel(location) {
    location.rollbackAttributes();
    let hours = (location.hasMany('operatingHours').value() || []).toArray();
    hours.invoke('rollbackAttributes');
  }

  @action
  addLocation() {
    let location = this.store.createRecord('location', {
      business: this.model,
      city: this.regions.activeRegion.defaultCity,
      state: this.regions.activeRegion.defaultState,
      zip: this.regions.activeRegion.defaultZip,
      createdAt: Date.now()
    });
    this.model.locations.pushObject(location);
    return location;
  }

  @action
  remove(location) {
    this.model.locations.removeObject(location);
    location.destroyRecord();
  }
}
