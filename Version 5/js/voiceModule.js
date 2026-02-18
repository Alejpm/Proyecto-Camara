import {
  state,
  resetCounters,
  resetLeft,
  resetRight,
  pauseCounting,
  resumeCounting
} from "./counterModule.js";

export function startVoice(){

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if(!SpeechRecognition){
    alert("Voz no soportada");
    return;
  }

  const rec = new SpeechRecognition();
  rec.lang = "es-ES";
  rec.start();

  rec.onresult = e => {

    const texto = e.results[0][0].transcript.toLowerCase();

    if(texto.includes("parar conteo")){
      pauseCounting();
      speak("Conteo en pausa");
      return;
    }

    if(texto.includes("seguir conteo")){
      resumeCounting();
      speak("Conteo reanudado");
      return;
    }

    if(texto.includes("reinicio izquierda")){
      resetLeft();
      speak("Izquierda reiniciada");
      return;
    }

    if(texto.includes("reinicio derecha")){
      resetRight();
      speak("Derecha reiniciada");
      return;
    }

    if(texto.includes("reinicio")){
      resetCounters();
      speak("Contador reiniciado");
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
  u.lang="es-ES";
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

