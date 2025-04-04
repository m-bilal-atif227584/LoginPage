// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, setDoc, doc, collection, query, where, getDoc, getDocs } from "firebase/firestore"
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: String(import.meta.env.VITE_API_KEY),
    authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
    messagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
    appId: String(import.meta.env.VITE_APP_ID),
    measurementId: String(import.meta.env.VITE_MEASUREMENT_ID)
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
try{
    const res = await createUserWithEmailAndPassword(auth,email,password)
    const user = res.user;
    await setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      username:username.toLowerCase(),
      email,
      name:"",
      gender:"",
      bio:"Hey, There I am testing login page.",
      lastSeen:Date.now()
    })
    await setDoc(doc(db,"chats",user.uid),{
        chatsData:[]
    })
}
catch(error){
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
}
}

const login = async (email, password) =>{
  try{
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch(error){
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

 const logout = async () =>{
      try{
        await signOut(auth);
        location.reload();
      }
      catch(error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
      }
    }

const resetPass = async (email) => {
  if(!email){
    toast.error("Enter your email!");
    return null;
  }
  try {
    const userRef = collection(db,'users');
    const q = query(userRef,where("email","==",email));
    const querySnap = await getDocs(q);
    if(!querySnap.empty){
      await sendPasswordResetEmail(auth,email);
      toast.success("Password reset email sent!")
    }
    else{
      toast.error("Email doesn't exists!")
    }
  } catch (error) {
    toast.error(error.message)
  }
}

export {signup, login, logout, auth, db,resetPass}
