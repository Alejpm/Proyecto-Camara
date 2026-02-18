import { initPose, setLandmarkColor } from "./poseModule.js";
import { state } from "./counterModule.js";
import { startVoice } from "./voiceModule.js";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const colorPicker = document.getElementById("landmarkColor");

video.addEventListener("loadedmetadata",()=>{
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});

initPose(video, canvas);

window.startVoice = startVoice;

/* Cambiar color neon */
colorPicker.addEventListener("input", (e)=>{
  setLandmarkColor(e.target.value);
});

/* Exportaciones */

function getData(){
  return {
    fecha: new Date().toLocaleString(),
    izquierda: state.leftCount,
    derecha: state.rightCount
  };
}

window.exportJSON = function(){
  const blob = new Blob(
    [JSON.stringify(getData(), null, 2)],
    {type:"application/json"}
  );
  download(blob, "repeticiones.json");
};

window.exportCSV = function(){
  const data = getData();
  const csv =
    "Fecha,Izquierda,Derecha\n" +
    `${data.fecha},${data.izquierda},${data.derecha}`;
  const blob = new Blob([csv], {type:"text/csv"});
  download(blob, "repeticiones.csv");
};

window.exportExcel = function(){
  const data = getData();
  const table = `
  <table>
    <tr><th>Fecha</th><th>Izquierda</th><th>Derecha</th></tr>
    <tr><td>${data.fecha}</td><td>${data.izquierda}</td><td>${data.derecha}</td></tr>
  </table>`;
  const blob = new Blob(
    [table],
    {type:"application/vnd.ms-excel"}
  );
  download(blob, "repeticiones.xls");
};

function download(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* Render */

function render(){

  document.getElementById("leftCount").textContent = state.leftCount;
  document.getElementById("rightCount").textContent = state.rightCount;

  document.getElementById("leftCard")
    .classList.toggle("active-left", state.leftUp);

  document.getElementById("rightCard")
    .classList.toggle("active-right", state.rightUp);

  document.getElementById("pauseOverlay")
    .classList.toggle("active", state.paused);

  requestAnimationFrame(render);
}

render();

