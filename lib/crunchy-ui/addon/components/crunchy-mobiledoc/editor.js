import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import MobiledocEditor from 'ember-mobiledoc-editor/components/mobiledoc-editor/component';
import layout from 'ember-mobiledoc-editor/components/mobiledoc-editor/template';
// import layout from '../../templates/components/crunchy-mobiledoc/editor';

@classic
@templateLayout(layout)
export default class Editor extends MobiledocEditor {}
