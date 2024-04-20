document.addEventListener("DOMContentLoaded", function () {
    // Ruta del archivo navbar
    var navbarUrl = "{{ url_for ('templates', filename ='nav.html')}}";
  
    // Cargar el navbar
    fetch(navbarUrl)
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar-container").innerHTML = data;
      })
      .catch(error => console.error("Error al cargar el navbar:", error));
  });
  