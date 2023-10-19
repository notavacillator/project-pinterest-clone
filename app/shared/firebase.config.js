// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4nPEEBFejPfHuFuBavtS-yEejMIPQpsk",
  authDomain: "project-pinterest-clone.firebaseapp.com",
  projectId: "project-pinterest-clone",
  storageBucket: "project-pinterest-clone.appspot.com",
  messagingSenderId: "149009747925",
  appId: "1:149009747925:web:f144e5e1b9df7a5fefb75c",
  measurementId: "G-3533JSGYVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (app.name && typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
}

export default app; 
