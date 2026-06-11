import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB0pLpTvTWDTXaEn0hTTZFyBwQretThJLs",
  authDomain: "dominique-challenge.firebaseapp.com",
  projectId: "dominique-challenge",
  storageBucket: "dominique-challenge.firebasestorage.app",
  messagingSenderId: "767003249941",
  appId: "1:767003249941:web:02d03fb61b3af21649ad1c"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
