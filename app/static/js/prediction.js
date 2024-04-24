// prediction.js
window.addEventListener('DOMContentLoaded', function() {
    // Leer el valor del atributo data-prediction
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var predictionData = currentScript.getAttribute('data-prediction');
    var predictionData = JSON.stringify(predictionArray[0]);

    // Verificar si predictionData es null
    if (predictionData) {
        // Convertir el JSON en un objeto JavaScript
        var predictionArray = JSON.parse(predictionData);

        // Imprimir la predicción en la consola
        console.log("Predicción:", predictionArray);
    } else {
        console.log("No se pudo obtener el valor del atributo data-prediction.");
    }
});
