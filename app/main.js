import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { db } from "../login/app/firebase.js";
import { auth } from "../login/app/firebase.js";
import { loginCheck } from "./loginCheck.js";
import "../login/app/signup.js";
import "./loginCheck.js"

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists() && docSnap.data().link == null) {
            // Si el usuario está autenticado y en el documento con su uid el campo link no es null, redirigir a otra página HTML
            window.location.href = "/vinculation/vinculation.html";
        }

        loginCheck(user)

    }else{

        loginCheck(user)

    }
});
