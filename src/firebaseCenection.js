import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDGjbZ3WhERqFqBQ7ps-k5PosS0bW7jZts",
    authDomain: "curso-bf004.firebaseapp.com",
    projectId: "curso-bf004",
    storageBucket: "curso-bf004.appspot.com",
    messagingSenderId: "797344773938",
    appId: "1:797344773938:web:17696158d0665ecd51492b",
    measurementId: "G-1DLB5KSLN3"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)

  export {db,auth}