import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDxKxerkL3pf-AepkUvccgijgGKOKFJxYQ",
  authDomain: "carroslista.firebaseapp.com",
  projectId: "carroslista",
  storageBucket: "carroslista.appspot.com",
  messagingSenderId: "409260655934",
  appId: "1:409260655934:web:5f34e260941c0dcd69586f",
};
firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;
export { projectFirestore, projectAuth, projectStorage, timestamp };
