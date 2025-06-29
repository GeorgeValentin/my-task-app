var admin = require('firebase-admin');

var serviceAccount = require('./firebase_admin_key/task-management-app-70c3a-firebase-adminsdk-fbsvc-4cfe771352.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };
