import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isPresent }  from '@ember/utils';

/*
* Adds a transition handler upon insertion that will
* alert if a transition is attempted and unsaved changes
* exist on either a single model or on any of an array of
* models.
*
* <CrunchyConfirmUnsaved @model={{this.business}}
*   or
* <CrunchyConfirmUnsaved @models={{this.businesses}}
*
* IMPORTANT:
* If using this component to track changes using a Snapshotable model,
* make sure to manage taking the snapshot on the model outside of
* this component. This component assumes if a snapshot exists, it
* contains the appropriate entries that we want to track.
* If snapshot is not initialized, no changes will be reported.
*
*/
export default class ConfirmUnsavedComponent extends Component {
  @service router;

  @tracked showUnsavedAlert = false;

  previousTransition = null;

  checkDirty(model) {
    if (!model) { return false; }

    if (model.hasDirtyAttributes) {
      return true;
    }
    /*
    * This applies to `Snapshotable` class only.
    */  
    if (typeof model.hasChangedSnapshot === 'function') {
      return model.hasChangedSnapshot();
    }
    return false;
  }

  checkAnyDirty(models) {
    if (!models) { return false; }

    let dirtyModels = models.toArray().filter(this.checkDirty);
    return dirtyModels.length > 0;
  }

  get hasUnsavedAttributes() {
    let models = this.args.models;
    let model = this.args.model;
    return isPresent(models) ? this.checkAnyDirty(models) : this.checkDirty(model);
  }

  @action
  handler(transition) {
    let { to: toRouteInfo, from: fromRouteInfo } = transition;

    if (toRouteInfo.name !== fromRouteInfo.name) {
      if (this.hasUnsavedAttributes) {
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
