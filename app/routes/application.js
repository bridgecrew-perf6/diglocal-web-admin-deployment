import classic from 'ember-classic-decorator';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Route from '@ember/routing/route';

@classic
export default class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {}
