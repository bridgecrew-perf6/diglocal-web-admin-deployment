import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

/**
*
* {{peek-record-from-id id "user"}}
*
*/
@classic
class PeekRecordFromId extends Helper {
  @service store;

  compute([ id, recordType ]) {
    if (!id || !recordType) {
      return;
    }
    return this.store.peekRecord(recordType, id);
  }
}

export default PeekRecordFromId;
