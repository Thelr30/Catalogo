// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT3EZhy0rIyxgk0tfb4-vYJPfx2emk6zc",
  authDomain: "viakonlogin.firebaseapp.com",
  projectId: "viakonlogin",
  storageBucket: "viakonlogin.firebasestorage.app",
  messagingSenderId: "552696615235",
  appId: "1:552696615235:web:41a874d604794f14aedff6"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase