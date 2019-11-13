import * as functions from 'firebase-functions'

export const notifiyUserOfMessage = functions.firestore.document('/users/{userId}').onCreate((snap: any, context: any) => {
  // Get an object representing the document
  // e.g. {'name': 'Marie', 'age': 66}
  // const newValue = snap.data();
  console.log('hello');
  // access a particular field as you would any JS property
  // const name = newValue.name;

  // perform desired operations ...
});