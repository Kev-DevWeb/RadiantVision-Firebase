import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { auth, db } from "../js/firebase.js";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().link == null) {
      // Si el usuario está autenticado y en el documento con su uid el campo link es null, redirigir a la página de vinculación
      if (!window.location.pathname.includes('vinculacion')) {
        window.location.href = "/vinculacion";
      }
    } 
  } else {
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    if (!window.location.pathname.includes('login')) {
      window.location.href = "/login";
    }
  }
});
