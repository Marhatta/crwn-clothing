import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBQ71p2RHD8_x2M01sv-Aonbtv_NxTY9js",
    authDomain: "crwn-clothing-49f80.firebaseapp.com",
    databaseURL: "https://crwn-clothing-49f80.firebaseio.com",
    projectId: "crwn-clothing-49f80",
    storageBucket: "gs://crwn-clothing-49f80.appspot.com",
    messagingSenderId: "792435220668",
    appId: "1:792435220668:web:a86d5f61ee0dd115"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //google authentication utility
  const provider  = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;