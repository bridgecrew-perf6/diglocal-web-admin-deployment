import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ConfirmUnsavedComponent extends Component {
  @service router;

  @tracked showUnsavedAlert = false;

  previousTransition = null;

  get isDirtyModel() {
    let model = this.args.model;
    if (model.hasDirtyAttributes) {
      return true;
    }
    return false;
  }

  @action
  handler(transition) {
    let { to: toRouteInfo, from: fromRouteInfo } = transition;

    if (toRouteInfo.name !== fromRouteInfo.name) {
      if (this.isDirtyModel) {
        this.previousTransition = transition;
        transition.abort();
        this.showUnsavedAlert = true;
      } else {
        this.previousTransition = null;
      }
    }
  }

  @action
  addTransitionHandler() {
    this.router.on('routeWillChange', this.handler);
  }
  
  removeTransitionHandler() {
    // In some cases the handler might have already been removed,
    // so we make sure to catch any resulting errors here
    try {
      this.router.off('routeWillChange', this.handler);
    } catch(e) {
      return false;
    }
  }

  willDestroy() {
    this.removeTransitionHandler();
    this.previousTransition = null;
  }

  @action
  leave() {
    this.showUnsavedAlert = false;
    this.removeTransitionHandler();
    this.previousTransition.retry();
  }

  @action
  stay() {
    this.showUnsavedAlert = false;
    this.previousTransition = null;
  }
}
