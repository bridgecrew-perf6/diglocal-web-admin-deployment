import classic from 'ember-classic-decorator';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import RSVP from 'rsvp';

@classic
export default class LocationsRoute extends Route.extend(AuthenticatedRouteMixin) {
  model(params, transition) {
    let businessId = get(transition, 'to.parent.params.id');
    let query = {
      filter: { business: businessId },
      include: 'operatingHours'
    };

    return RSVP.hash({
      locations: this.store.query('location', query),
      business: this.store.find('business', businessId)
    });
  }

  @action
  save(model) {
    model.save();
  }
}
