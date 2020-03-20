import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSelectBusinessController extends Controller {
    @service('regions') regionsService;
    @service router;

    @action
    didSelectActiveBusiness(business) {
        this.router.transitionTo('authenticated.manage.business.index', business.id);
    }
}