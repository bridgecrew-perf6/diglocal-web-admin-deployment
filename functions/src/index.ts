import * as admin from 'firebase-admin';

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
export * from './images';
export * from './messages';

admin.initializeApp();
