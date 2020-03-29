import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class AuthenticatedManageBusinessLocationsRoute extends Route {
  model() {
    let business = this.modelFor('authenticated.manage.business');
    let query = {
      filter: { business: business.id },
      include: 'operatingHours'
    };

    return RSVP.hash({
      locations: this.store.query('location', query),
      business
    });
  }
}
