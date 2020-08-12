import Trackable from './trackable';
import equal from 'fast-deep-equal';

/*
* Expanded from https://github.com/Oreoz/ember-snapshots
*
* Model class `Snapshotable` allows for taking snapshots of
* specified attributes, which can then be compared to the
* current state of the model by calling `hasChangedSnapshot`
*
* Take a snapshot for an array of attributes you want to track:
*
*  `blogPost.takeSnapshot([ 'comments' ])`
*  
* Check if the snapshot attributes have been changed:
*
*  `let hasChanged = blogPost.hasChangedSnapshot()`
*
* Rollback the snapshotted attributes to their previous snapshot values:
*
*  `blogpost.rollbackSnapshotAttrs()`
*/
export default class Snapshotable extends Trackable {
  _snapshot = {};

  /*
  * Rollback snapshotted attributes to their previous values
  *
  * Note: This method ONLY reverts the attributes that exist
  * as entries in the current _snapshot object
  */
  rollbackSnapshotAttrs() {
    const snapshot = this.snapshotDiff();

    Object.entries(snapshot).forEach(([ key, [ oldValue ] ]) => {
      this[key] = oldValue;
    });
  }

  /*
  * Take a snapshot of the specified model properties only.
  *
  * Note: This is not a full snapshot. Only the passed props
  * will be snapshotted.
  */
  takeSnapshot(props = []) {
    const object = this.getProperties(props);

    this.eachRelationship((name, descriptor) => {
      if (descriptor.kind === 'hasMany' && props.includes(name)) {
        object[name] = this[name].toArray();
      }
    });

    this._snapshot = object;

    return object;
  }

  /*
  * Get the snapshot diff.
  *
  * Returns an object with a key for each snapshotted attr,
  * where the value is an array with old attr value and current attr value:
  * 
  * { comments: [ oldValue, newValue ] }
  *
  */
  snapshotDiff() {
    const snapshot = this.get('_snapshot');

    return Object.entries(snapshot).reduce((accumulator, [ key, value ]) => {
      accumulator[key] = [value, this[key]];
      this.eachRelationship((name, descriptor) => {
        if (key === name && descriptor.kind === 'hasMany') {
          accumulator[key] = [value, this[key].toArray()];
        }
      });
      return accumulator;
    }, {});
  }

  /*
  * Compare all snapshotted attributes, current and previous, and determine
  * if snapshot attributes have changed and are "dirty"
  */
  hasChangedSnapshot() {
    const snapshot = this.snapshotDiff();

    let changed = Object.entries(snapshot).filter(([ , [ oldValue, newValue ] ]) => {
      return !equal(oldValue, newValue);
    });
    
    return changed.length > 0;
  }

  /*
  * Reset snapshot
  */
  clearSnapshot() {
    this._snapshot = {};
  }
}
