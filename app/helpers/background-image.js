import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default helper(function backgroundImage([ url ]/*, hash*/) {
  return htmlSafe(`background-image: url('${url}');`);
});
