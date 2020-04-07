import ApplicationSerializer from 'diglocal-manage/serializers/application';

export default class ScoopSerializer extends ApplicationSerializer {
  serializeAttribute(snapshot, json, key, attributes) {
    let toSkip = [
      'image',
      'nextDate',
      'isPast'
    ];
    if (toSkip.includes(key)) { return; }

    let isRecurring = snapshot.record && snapshot.record.isRecurring;
    if (isRecurring && key === 'eventDate') {
      return;
    }

    return super.serializeAttribute(snapshot, json, key, attributes);
  }
}
