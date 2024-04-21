import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"; 
import { auth, db } from "../js/firebase.js";
import { showMessage } from "../js/toast.js";
import {} from "../js/profileCheck.js"

const trackerForm = document.querySelector("#tracker-form");

trackerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    // Obtener información del usuario autenticado
    const user = auth.currentUser;
    if (!user) {
      // Si no hay usuario autenticado, muestra un mensaje de error y detén la ejecución
      showMessage("No hay usuario autenticado", "error");
      return;
    }

    // Obtener el valor del campo "tracker" del formulario
    const link = trackerForm["tracker"].value;
   
    // Obtener la UID del usuario
    const uid = user.uid;

    // Actualizar el campo 'link' en Firestore para el usuario con la UID del usuario como identificador
    const userDoc = doc(db, "users", uid);
    await updateDoc(userDoc, {
      link: link
    });

    // Mostrar un mensaje de éxito
    showMessage("Vinculación exitosa", "success");

      if (!window.location.pathname.includes('home')) {
        window.location.href = "/home";
      }
  

  } catch (error) {
    // En caso de error, mostrar un mensaje de error
    showMessage("Vinculación fallida", "error");
    console.error("Error updating document: ", error);
  }
});
