import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { auth } from "./firebase.js"

const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = signupForm['email3'].value
    const pass = signupForm['password3'].value

   try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, pass)
    console.log(userCredentials)
    
    //close signup modal
    const signupModal = document.querySelector('#registers')
    const modal = bootstrap.Modal.getInstance(signupModal)
    modal.hide()

    //open register result

    const resModal = document.querySelector('#res')
    const modalres = bootstrap.Modal.getInstance(resModal)
    modalres.show()

   } catch (error) {

    console.log(error)
    
   }
})