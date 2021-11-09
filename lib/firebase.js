// we have to load the firebase-admin in order to interact with our firebse project
import admin from "firebase-admin";

// to get ready to send a authentication request to firebase, we load the json
// we load the json string and convert to an actual JSON object (instead of loading file)
// why? this is more secure than saving our creds in a JSON file file in our project
const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_PRIVATEKEY
);

// let's wrap all of our code that tries to talk to firebase in a try{}
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  }
  );
} catch(err) {
  // if error happens...
  if ( err.message.indexOf("already exists") === -1 ) {
    console.log("firebase err:", err.stack);
  }
}

export default admin.firestore();