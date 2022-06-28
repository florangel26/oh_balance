import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc78Ce2VSFwlljil-EQQ3Ak42LnWmhSf8",
  authDomain: "oh-balance.firebaseapp.com",
  projectId: "oh-balance",
  storageBucket: "oh-balance.appspot.com",
  messagingSenderId: "843308061729",
  appId: "1:843308061729:web:77ec4b93470f7b48f83f60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth (app);
const db = getFirestore(app);

//rutas protegidas
//promesa creada para evitar que al actualizar con el usuario activo se vaya al login//
const currentUserPromise = () => new Promise ((resolve,reject)  => {
   onAuthStateChanged (auth, user => {
     resolve(user)
   },  e => reject (e))
})

export {auth, currentUserPromise, db};