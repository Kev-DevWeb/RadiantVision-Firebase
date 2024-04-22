import { doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"; 
import { auth, db } from "../js/firebase.js";
import { showMessage } from "../js/toast.js";
import {} from "../js/profileCheck.js"

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
    console.log(UserAfter);
    // Actualizar el mensaje de bienvenida
    welcomeMessageElement.innerText = `${greeting}, ${UserAfter}!`;
}

// Función para manejar el evento de carga de usuario
async function handleUserLoad() {
    // Obtener información del usuario autenticado
    const user = auth.currentUser;

    if (user) {
        // Si hay un usuario autenticado, obtener su nombre de usuario desde Firestore
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const UserAfter = docSnap.data().user;
            showWelcomeMessage(UserAfter);
            
        } catch (error) {
            // En caso de error, mostrar un mensaje de error en la consola
            console.error("Error getting user document:", error);
        }
    }
}

// Manejar el evento DOMContentLoaded para cargar el usuario y mostrar el mensaje de bienvenida
document.addEventListener("DOMContentLoaded", async () => {
    await handleUserLoad();

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

// Función para realizar la solicitud AJAX y obtener la predicción
function obtenerPrediccion() {
    // Hacer una solicitud AJAX al servidor para obtener la predicción
    fetch('/perfil', {
      method: 'POST',
      body: JSON.stringify(data), // Si necesitas enviar datos al servidor
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Acceder a la predicción devuelta
      const prediction = data.prediction;
      console.log('Predicción:', prediction);
      // Hacer algo con la predicción, como mostrarla en la interfaz de usuario
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


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
        let userLink = link;
        // Después de obtener el enlace en la variable userLink
        document.getElementById('trackerLink').value = userLink;

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

        // Obtener y mostrar la predicción
        obtenerPrediccion();
        
    } catch (error) {
        // En caso de error, mostrar un mensaje de error
        showMessage("Vinculación fallida", "error");
        console.error("Error updating document: ", error);
    }
});
