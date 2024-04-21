import { doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"; 
import { auth, db } from "../js/firebase.js";
import { showMessage } from "../js/toast.js";
import {} from "../js/profileCheck.js"

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('boton-actualizar').addEventListener('click', function() {
        var formulario = document.getElementById('formulario');
        if (formulario.style.display === 'none' || formulario.style.display === '') {
            formulario.style.display = 'block';
        } else {
            formulario.style.display = 'none';
        }
    });
});


const linkForm = document.querySelector("#formLinkAgain");

linkForm.addEventListener("submit", async (e) => {
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
    const link = linkForm["linking"].value;
   
    // Obtener la UID del usuario
    const uid = user.uid;

    // Guardar el enlace en una variable
    let userLink = link;

    // Consultar el enlace antes de la actualización
    const docRefBefore = doc(db, "users", uid);
    const docSnapBefore = await getDoc(docRefBefore);
    const linkBefore = docSnapBefore.data().link;

    // Actualizar el campo 'link' en Firestore para el usuario con la UID del usuario como identificador
    const userDoc = doc(db, "users", uid);
    await updateDoc(userDoc, {
      link: link
    });

    // Consultar el enlace después de la actualización
    const docRefAfter = doc(db, "users", uid);
    const docSnapAfter = await getDoc(docRefAfter);
    const linkAfter = docSnapAfter.data().link;

    // Mostrar un mensaje de éxito
    showMessage("Vinculación exitosa", "success");
    showMessage("Puedes cerrar el formulario dando click en Actualizar URL nuvamente", "success");
    showMessage("Puedes comenzar a usar la herramienta, click en Comenzar analisis", "success");
  

  } catch (error) {
    // En caso de error, mostrar un mensaje de error
    showMessage("Vinculación fallida", "error");
    console.error("Error updating document: ", error);
  }
});
