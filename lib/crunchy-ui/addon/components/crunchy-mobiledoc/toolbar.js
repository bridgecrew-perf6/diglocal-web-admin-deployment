import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import MobiledocToolbar from 'ember-mobiledoc-editor/components/mobiledoc-toolbar/component';
import layout from '../../templates/components/crunchy-mobiledoc/toolbar';

@classic
@templateLayout(layout)
export default class Toolbar extends MobiledocToolbar {}
