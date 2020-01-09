import Component from '@ember/component';
import { get, set } from '@ember/object';
import { assert } from '@ember/debug';

export default Component.extend({
  init() {
    this._super(...arguments);
    assert(`Component 'photo/grid' expects an array 'selectedPhotos'`, this.selectedPhotos);
  },

  actions: {
    dragEnd ({sourceList, sourceIndex, targetList, targetIndex}) {
      if (sourceList === targetList && sourceIndex === targetIndex) { return; }
      let item = sourceList.objectAt(sourceIndex);

      sourceList.removeAt(sourceIndex);
      sourceList.insertAt(targetIndex, item)

      sourceList.forEach((element, index) => {
        if (get(element, 'position') !== index) {
          set(element, 'position', index);
          element.save();
        }
      });
    },
    save(model) {
      model.save();
    },
    select(photo) {
      let alreadySelected = this.selectedPhotos.findBy('id', photo.id);
      if (alreadySelected) {
        this.selectedPhotos.removeObject(photo);
      } else {
        this.selectedPhotos.addObject(photo);
      }
    },
    checkboxSelect(photo, event) {
      event.stopPropagation();
      let { target: { checked } } = event;
      if (checked) {
        this.selectedPhotos.addObject(photo);
      } else {
        this.selectedPhotos.removeObject(photo);
      }
    }
  }
});
