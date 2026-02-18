import { state, resetCounters, resetLeft, resetRight } from "./counterModule.js";

export function startVoice(){

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if(!SpeechRecognition){
    alert("Reconocimiento de voz no soportado");
    return;
  }

  const rec = new SpeechRecognition();
  rec.lang = "es-ES";
  rec.start();

  rec.onresult = e => {

    const texto = e.results[0][0].transcript.toLowerCase();
    console.log("Reconocido:", texto);

    if(texto.includes("reinicio izquierda")){
      resetLeft();
      speak("Brazo izquierdo reiniciado");
      return;
    }

    if(texto.includes("reinicio derecha")){
      resetRight();
      speak("Brazo derecho reiniciado");
      return;
    }

    if(texto.includes("reinicio") || texto.includes("reiniciar")){
      resetCounters();
      speak("Contador completo reiniciado");
      return;
    }

    if(texto.includes("estado")){
      speak("Izquierdo " + state.leftCount +
            " Derecho " + state.rightCount);
    }
  };
}

function speak(text){
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-ES";
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

