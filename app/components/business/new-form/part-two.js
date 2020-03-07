import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BusinessNewFormPartTwoComponent extends Component {
  @service store;
  @service regions;

  @action
  addLocation() {
    let location = this.store.createRecord('location', {
      business: this.args.model,
      city: this.regions.activeRegion.defaultCity,
      state: this.regions.activeRegion.defaultState,
      zip: this.regions.activeRegion.defaultZip
    });
    this.args.model.locations.pushObject(location);
    return location;
  }

  @action
  remove(location) {
    this.args.model.locations.removeObject(location);
    location.destroyRecord();
  }
}
