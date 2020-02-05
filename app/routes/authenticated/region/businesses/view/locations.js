import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import RSVP from 'rsvp';

@classic
export default class LocationsRoute extends Route.extend() {
  model() {
    let business = this.modelFor('authenticated.region.businesses.view');
    let query = {
      filter: { business: business.id },
      include: 'operatingHours'
    };

    return RSVP.hash({
      locations: this.store.query('location', query),
      business: this.store.find('business', business.id)
    });
  }

  @action
  save(model) {
    model.save();
  }
}
