var canvas;
var video;
var classifier;
var result="";
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier =ml5.imageClassifier("MobileNet",ModeloCarregado );
}
function ModeloCarregado(){
  console.log(" ModeloCarregado ");
}
function drawn(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, PegaResultado);
}
function PegaResultado(error, results){
  if(error){
    console.error(error);
  }else{
    if((results[0].confidence>0.5)&&(result!=results[0].label)){
      result=results[0].label;
      var synth=window.speechSynthesis; 
      var dadofala="o ojeto detectado é " + result;
      var fala_convertida=new SpeechSynthesisUtterance(dadofala);
      synth.speak(fala_convertida);
      document.getElementById("resultObjectName").innerHTML=result;
      document.getElementById("resultObjectAccuracy").innerHTML=results[0].confidence.toFixed(3);
    }
  }
}

