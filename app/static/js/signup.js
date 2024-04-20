import { createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { addDoc, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"; 
import { auth, db } from "../js/firebase.js";
import { showMessage } from "../js/toast.js";

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signupForm["email3"].value;
  const pass = signupForm["password3"].value;
  const username = signupForm["text3"].value;

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, pass);
    console.log(userCredentials);

    // Obtener la UID del usuario
    const uid = userCredentials.user.uid;

    // Agregar el usuario a Firestore con la UID del usuario como identificador
    const docRef = await setDoc(doc(collection(db, "users"), uid), {
      user: username,
      link: null,
    });
    console.log("Document written with ID: ", uid);
    
    // Cierra sesión después de registrarse exitosamente
    await signOut(auth);

    // Cierra el modal de registro
    const signupModal = document.querySelector("#registers");
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    // Abre el modal de registro exitoso
    const resModal = document.querySelector("#res");
    const modalres = new bootstrap.Modal(resModal);
    modalres.show();
  } catch (error) {
    console.log(error.message);
    console.log(error.code);

    if (error.code === "auth/invalid-email") {
      showMessage("Correo invalido", "error");
    } else if (error.code === "auth/weak-password") {
      showMessage("Minimo 6 caracteres en contraseña", "error");
    } else if (error.code === "auth/email-already-in-use") {
      showMessage("El correo ya esta en uso", "error");
    } else if (error.code) {
      // Otros errores
    }
  }
});
