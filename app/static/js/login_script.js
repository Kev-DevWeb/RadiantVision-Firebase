import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getDoc, doc,} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { db } from "../js/firebase.js";
import { auth } from "../js/firebase.js";
import "../js/signup.js";
import "../js/signin.js";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().link == null) {
      // Si el usuario está autenticado y en el documento con su uid el campo link no es null, redirigir a otra página HTML
      window.location.href = "/home";
    }
  } else {
  }
});


/*const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});*/
