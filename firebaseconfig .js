
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getFirestore,doc,getDoc,addDoc,collection,serverTimestamp,query,getDocs,updateDoc, setDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCJeOeIv9qwHBowa67Go_mbtNfNRIIHN-Q",
    authDomain: "practice-app-b23f9.firebaseapp.com",
    projectId: "practice-app-b23f9",
    storageBucket: "practice-app-b23f9.appspot.com",
    messagingSenderId: "1076119456190",
    appId: "1:1076119456190:web:9b60cf99e25948906891ef"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage();

  export{auth,createUserWithEmailAndPassword,doc,getDoc ,getDocs,serverTimestamp,query ,db,signInWithEmailAndPassword,signOut,updateDoc ,onAuthStateChanged,addDoc,collection,deleteDoc, storage ,ref, uploadBytesResumable, getDownloadURL, setDoc}