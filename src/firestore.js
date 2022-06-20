import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCdYrjfrtx9uMXz4U2YFAkSFL4AGvs3C6U",
    authDomain: "chat-app-2c881.firebaseapp.com",
    projectId: "chat-app-2c881",
    storageBucket: "chat-app-2c881.appspot.com",
    messagingSenderId: "411257995596",
    appId: "1:411257995596:web:a834ba741f50e5f53d0fe9",
    measurementId: "G-8QJXRQ5FFB"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);