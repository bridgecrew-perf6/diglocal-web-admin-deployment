import classic from 'ember-classic-decorator';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { getOwner } from '@ember/application';
import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

@classic
class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {
  @service currentUser;
  @service firebaseApp;

  async beforeModel() {
    let currentUser = await this.firebaseApp.auth().then(({currentUser}) =>
      currentUser ? this.store.query('user', { filter: { firebaseId: currentUser.uid}, include: 'profileImages,businesses,businesses.region' }).then(data => data.get('firstObject')) : resolve()
    );

    this.currentUser.user = currentUser;

    if (this.currentUser.userType && this.currentUser.isRestricted) {
      let controller = this.controllerFor('application');
      controller.showForbiddenAlert = true;
      this.session.invalidate();
    }
  }

  async sessionAuthenticated() {
    const attemptedTransition = this.get('session.attemptedTransition');
    const cookies = getOwner(this).lookup('service:cookies');
    const redirectTarget = cookies.read('ember_simple_auth-redirectTarget');

    let currentUser = await this.firebaseApp.auth().then(({currentUser}) =>
      currentUser ? this.store.query('user', { filter: { firebaseId: currentUser.uid}, include: 'profileImages,businesses,businesses.region' }).then(data => data.get('firstObject')) : resolve()
    );

    this.currentUser.user = currentUser;

    if (this.currentUser.userType && this.currentUser.isRestricted) {
      let controller = this.controllerFor('application');
      controller.showForbiddenAlert = true;
      this.set('session.attemptedTransition', null);
      return;
    }

    if (attemptedTransition) {
      attemptedTransition.retry();
      this.set('session.attemptedTransition', null);
    } else if (redirectTarget) {
      this.transitionTo(redirectTarget);
      cookies.clear('ember_simple_auth-redirectTarget');
    } else {
      this.transitionTo('/');
    }
  }
}

export default ApplicationRoute;
