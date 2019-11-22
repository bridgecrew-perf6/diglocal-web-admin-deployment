import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

/**
*
* {{peek-record-from-id id "user"}}
*
*/
export default Helper.extend({
  store: service(),

  compute([ id, recordType ]) {
    if (!id || !recordType) {
      return;
    }
    return this.store.peekRecord(recordType, id);
  }
});
