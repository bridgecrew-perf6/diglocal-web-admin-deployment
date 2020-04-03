import classic from 'ember-classic-decorator';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/crunchy-breadcrumbs';

@classic
@templateLayout(layout)
@classNames('crunchy-breadcrumbs')
export default class CrunchyBreadcrumbs extends Component {
  @service
  router;

  crumbClass = "crunchy-breadcrumbs__item";
  linkClass = "crunchy-breadcrumbs__link";
  linkable = true;
}
