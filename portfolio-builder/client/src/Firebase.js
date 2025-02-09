// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// import { getAnalytics } from "firebase/analytics";
// import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCqxhR2JBwWbfF1_8fXVRcEEwEqZe9Xu6s",
    authDomain: "dynamic-portfolio-947e4.firebaseapp.com",
    projectId: "dynamic-portfolio-947e4",
    storageBucket: "dynamic-portfolio-947e4.appspot.com",
    messagingSenderId: "173419952255",
    appId: "1:173419952255:web:ca78e915304cec6f84e74a",
    measurementId: "G-M6PGTXG64S"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = firebase.storage();
// const analytics = getAnalytics(app);

