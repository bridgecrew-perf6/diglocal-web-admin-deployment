import Component from '@ember/component';
import { get, set } from '@ember/object';

export default Component.extend({
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
    }
  }
});
