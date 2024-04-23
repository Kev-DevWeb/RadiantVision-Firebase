//prediction.js

// Leer el valor del atributo data-prediction
var predictionDataElement = document.getElementById("prediction-data");
var predictionData = predictionDataElement.getAttribute("data-prediction");

// Convertir el JSON en un objeto JavaScript
var predictionArray = JSON.parse(predictionData);

// Imprimir la predicción en la consola
console.log("Predicción:", predictionArray);
