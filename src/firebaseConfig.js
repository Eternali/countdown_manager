import firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
let config = {
  apiKey: "AIzaSyD-LldZi9cvrzSw-CmyqBPHYMfKpb1ze7o",
  authDomain: "countdownmanager.firebaseapp.com",
  databaseURL: "https://countdownmanager.firebaseio.com",
  projectId: "countdownmanager",
  storageBucket: "countdownmanager.appspot.com",
  messagingSenderId: "717123491434"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth()
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection('users');
const countdownCollection = db.collection('countdowns');

export {
  db,
  auth,
  currentUser,
  usersCollection,
  countdownCollection,
};
