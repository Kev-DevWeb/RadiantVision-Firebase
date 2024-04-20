export function showMessage(message, type){
  Toastify({
      text: message,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #B02E3B, #000000)",
      },
      onClick: function(){} // Callback after click
    }).showToast();
}
