  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBuAid5YJZky4S_mX8-sVk7khGfd3n3f-M",
    authDomain: "radiantvision-a9c34.firebaseapp.com",
    projectId: "radiantvision-a9c34",
    storageBucket: "radiantvision-a9c34.appspot.com",
    messagingSenderId: "205035714711",
    appId: "1:205035714711:web:03ff051fe6a946868151d2",
    measurementId: "G-9NXGWJNKK8"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const analytics = getAnalytics(app);

  export const auth = getAuth(app)