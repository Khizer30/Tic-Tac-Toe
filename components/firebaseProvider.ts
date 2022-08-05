import { initializeApp, FirebaseApp } from "firebase/app" ;
import { initializeFirestore, Firestore } from "firebase/firestore" ;

// Firebase
const firebaseConfig: object =
{
  apiKey: "AIzaSyCj9_Q-D2khV2hRACswA8qIB8JziFesUfg",
  authDomain: "tic-tac-toe-0786.firebaseapp.com",
  projectId: "tic-tac-toe-0786",
  storageBucket: "tic-tac-toe-0786.appspot.com",
  messagingSenderId: "1070598365703",
  appId: "1:1070598365703:web:02b03e4d6c7c126c8100a2",
  measurementId: "G-4E58XJDEYP"
} ;

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig) ;

// Firestore
const db: Firestore = initializeFirestore(app, { experimentalForceLongPolling: true }) ;

// Export Database
export default db ;