import Component from '@ember/component';
import layout from '../templates/components/crunchy-breadcrumbs';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,

  router: service(),

  classNames: [ 'crunchy-breadcrumbs' ],

  crumbClass: "crunchy-breadcrumbs__item",
  linkClass: "crunchy-breadcrumbs__link",

  linkable: true
});
