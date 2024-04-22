import { doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { auth, db } from "../js/firebase.js";
import { showMessage } from "../js/toast.js";
import {} from "../js/profileCheck.js";

// Función para mostrar el mensaje de bienvenida
function showWelcomeMessage(UserAfter) {
    const welcomeMessageElement = document.getElementById('welcome-message');
    
    // Obtener la hora actual
    const currentHour = new Date().getHours();
    
    // Determinar el saludo apropiado basado en la hora del día
    let greeting;
    if (currentHour < 12) {
        greeting = "Buenos días";
    } else if (currentHour < 18) {
        greeting = "Buenas tardes";
    } else {
        greeting = "Buenas noches";
    }
    
    // Actualizar el mensaje de bienvenida
    welcomeMessageElement.innerText = `${greeting}, ${UserAfter}!`;
}

// Función para manejar el evento de carga de usuario
async function handleUserLoad() {
    try {
        // Obtener información del usuario autenticado
        const user = auth.currentUser;

        if (user) {
            // Si hay un usuario autenticado, obtener su nombre de usuario desde Firestore
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const UserAfter = docSnap.data().user;
            showWelcomeMessage(UserAfter);
        }
    } catch (error) {
        // En caso de error, mostrar un mensaje de error en la consola
        console.error("Error getting user document:", error);
    }
}

// Manejar el evento DOMContentLoaded para cargar el usuario y mostrar el mensaje de bienvenida
document.addEventListener("DOMContentLoaded", async () => {
    await handleUserLoad();

    document.getElementById('boton-actualizar').addEventListener('click', () => {
        const formulario = document.getElementById('formulario');
        formulario.style.display = formulario.style.display === 'none' || formulario.style.display === '' ? 'block' : 'none';
    });

    // Manejar el evento de clic en el botón de análisis
    document.getElementById('boton-analisis').addEventListener('click', async () => {
        try {
            // Obtener información del usuario autenticado
            const user = auth.currentUser;
            if (!user) {
                // Si no hay usuario autenticado, muestra un mensaje de error y detén la ejecución
                showMessage("No hay usuario autenticado", "error");
                return;
            }

            // Consultar el enlace antes de la actualización
            const docRefBefore = doc(db, "users", user.uid);
            const docSnapBefore = await getDoc(docRefBefore);
            const linkBefore = docSnapBefore.data().link;

            // Realizar la predicción
            obtenerPrediccion(user.uid, linkBefore); // Pasar la uid y el linkBefore como argumentos
            
        } catch (error) {
            // En caso de error, mostrar un mensaje de error
            showMessage("Error al realizar la predicción", "error");
            console.error("Error during prediction: ", error);
        }
    });
});

// Función para realizar la solicitud AJAX y obtener la predicción
async function obtenerPrediccion(uid, linkBefore) {
    try {
        // Llenar el valor del campo linkBefore en el formulario oculto
        document.getElementById('linkBeforeInput').value = linkBefore;
        
        // Enviar el formulario
        document.getElementById('predictionForm').submit();
    } catch (error) {
        console.error('Error al obtener la predicción:', error);
    }
}

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

        // Obtener el valor del campo "linking" del formulario
        const link = linkForm["linking"].value;
        
        // Obtener la UID del usuario
        const uid = user.uid;

        // Guardar el enlace en una variable
        const userLink = link;
        // Después de obtener el enlace en la variable userLink
        document.getElementById('linkBeforeInput').value = userLink;

        // Consultar el enlace antes de la actualización
        const docRefBefore = doc(db, "users", uid);
        const docSnapBefore = await getDoc(docRefBefore);
        const linkBefore = docSnapBefore.data().link;

        // Actualizar el campo 'link' en Firestore para el usuario con la UID del usuario como identificador
        const userDoc = doc(db, "users", uid);
        await updateDoc(userDoc, { link });
        

        // Mostrar un mensaje de éxito
        showMessage("Vinculación exitosa", "success");
        showMessage("Puedes cerrar el formulario dando click en Actualizar URL nuevamente", "success");
        showMessage("Puedes comenzar a usar la herramienta, click en Comenzar análisis", "success");

        // No es necesario realizar la predicción aquí, ya que se realizará cuando se presione el botón de análisis
        
    } catch (error) {
        // En caso de error, mostrar un mensaje de error
        showMessage("Vinculación fallida", "error");
        console.error("Error updating document: ", error);
    }
});
