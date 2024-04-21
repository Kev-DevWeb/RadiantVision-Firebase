import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../js/firebase.js";
import { showMessage } from "../js/toast.js";

const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signInForm["email2"].value;
  const pass = signInForm["password2"].value;

  try {
    const credentials = await signInWithEmailAndPassword(auth, email, pass);
    window.location.href = "/home";
  } catch (error) {
    showMessage("Credenciales erroneas, revisa tus datos", "error");
  }
});
