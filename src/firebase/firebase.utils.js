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

  //save user to firestore if not exists
  export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    
    if(!snapshot.exists){
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //google authentication utility
  const provider  = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;