import Component from '@glimmer/component';
import { get, set, action } from '@ember/object';

export default class PhotoGridComponent extends Component {
  get newImageSrcAttr() {
    return this.args.newImageSrcAttr || 'url';
  }

  get imageSrcAttr() {
    return this.args.imageSrcAttr || 'sizes.mobile';
  }

  @action
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
  }

  updateSelected(array) {
    return this.args.didUpdateSelected(array);
  }

  @action
  select(photo) {
    let selectedPhotos = [ ...this.args.selectedPhotos ];
    let alreadySelected = selectedPhotos.findBy('id', photo.id);

    if (alreadySelected) {
      selectedPhotos.removeObject(photo);
    } else {
      selectedPhotos.addObject(photo);
    }

    this.updateSelected(selectedPhotos);
  }

  @action
  checkboxSelect(photo, event) {
    event.stopPropagation();
    let { target: { checked } } = event;
    let selectedPhotos = [ ...this.args.selectedPhotos ];

    if (checked) {
      selectedPhotos.addObject(photo);
    } else {
      selectedPhotos.removeObject(photo);
    }

    this.updateSelected(selectedPhotos);
  }
}

