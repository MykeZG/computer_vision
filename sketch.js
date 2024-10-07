// Classifier Variable
let classifier; // clasificador de imagenes, crea la variable sin iniciarla
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/BJ_CVnw-H/"; // se crea la variable para el url

// Video
let video; // variable para el video
let flippedVideo; // esta variable la vamos a dejar de utilizar
// To store the classification
let etiqueta = ""; // variable etiqueta esto me permitira alamcenar las clases de los objetos
let confianza = 0;

// Load the model first
// preload primero se carga el modelo, revisar la url de la imagen y coger el modelo que nos envia el modelo que nos envia techable machine entonces esta accion se ejecuta antes que el setup, entonces p5 nos ofrece este funcion primero la cargamos y luego la trabajamos.
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  //   se inicia el clasificador, y hace que busque y usemos el url y le agregamos el model.json (api javascript)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video
  // se crea el vide empieza a capturar
  video = createCapture(VIDEO);
  video.size(1080, 720);
  video.hide();

  // flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, (width - video.width) / 2, (height - video.height) / 2);

  // Draw the label
  fill(255); // color de la letra grande
  textSize(20);
  textAlign(CENTER);
  text(etiqueta, width / 2, height - 100);

  textSize(12);
  textAlign(CENTER);
  text((confianza = (confianza * 100).toFixed(0)), width / 2, height - 80);
  fill(255);

  if (etiqueta == "Mentol" && confianza > 90) {
    background(255, 255, 0, 50);
  }
  if (etiqueta == "Tarjeta" && confianza > 90) {
    background(255, 0, 0, 50);
  }
  if (etiqueta == "Parlante" && confianza > 90) {
    background(0, 0, 255, 50);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  //   flippedVideo = ml5.flipImage(video);
  classifier.classify(video, gotResult);
  //   flippedVideo.remove();
}

// When we get a result
function gotResult(results, error) {
  // If there is an error
  if (error) {
    console.error(error);
    return; // hace que deje de ejecutarse
  }
  //   si no hay error pasamos a la siguiente línea
  // The results are in an array ordered by confidence.
  //   console.log(results[0]);
  etiqueta = results[0].label;
  confianza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
