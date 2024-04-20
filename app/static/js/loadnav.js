import { loginCheck } from "../js/loginCheck.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../js/firebase.js";

document.addEventListener("DOMContentLoaded", function () {
  // Ruta del archivo navbar
  var navbarUrl = document.body.getAttribute("data-navbar-url");

  // Cargar el navbar
  fetch(navbarUrl)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      // Aquí es donde puedes colocar tu lógica de autenticación
      onAuthStateChanged(auth, async (user) => {
        loginCheck(user);
      });

      const logout = document.querySelector("#logout");

      logout.addEventListener("click", async () => {
        await signOut(auth);
        console.log("User signed out");
        console.log(userCredentials);
      });
    })
    .catch((error) => console.error("Error al cargar el navbar:", error));
});
