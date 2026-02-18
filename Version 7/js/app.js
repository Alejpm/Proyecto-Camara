import { initPose, setLandmarkColor, toggleSilhouetteMode } from "./poseModule.js";
import { state } from "./counterModule.js";
import { startVoice } from "./voiceModule.js";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const colorPicker = document.getElementById("landmarkColor");

// Inicializar cámara
video.addEventListener("loadedmetadata",()=>{
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});

initPose(video, canvas);

// Hacer funciones accesibles desde HTML
window.startVoice = startVoice;
window.toggleSilhouette = toggleSilhouetteMode;

/* ============================= */
/* CAMBIO COLOR NEON */
/* ============================= */

if(colorPicker){
  colorPicker.addEventListener("input", (e)=>{
    setLandmarkColor(e.target.value);
  });
}

/* ============================= */
/* EXPORTACIONES */
/* ============================= */

function getData(){
  return {
    fecha: new Date().toLocaleString(),
    izquierda: state.leftCount,
    derecha: state.rightCount
  };
}

// JSON
window.exportJSON = function(){

  const data = getData();

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  downloadFile(blob, "repeticiones.json");
};

// CSV
window.exportCSV = function(){

  const data = getData();

  const csvContent =
    "Fecha,Izquierda,Derecha\n" +
    `${data.fecha},${data.izquierda},${data.derecha}`;

  const blob = new Blob([csvContent], { type: "text/csv" });

  downloadFile(blob, "repeticiones.csv");
};

// Excel (compatible con Excel)
window.exportExcel = function(){

  const data = getData();

  const table = `
    <table>
      <tr>
        <th>Fecha</th>
        <th>Izquierda</th>
        <th>Derecha</th>
      </tr>
      <tr>
        <td>${data.fecha}</td>
        <td>${data.izquierda}</td>
        <td>${data.derecha}</td>
      </tr>
    </table>
  `;

  const blob = new Blob(
    [table],
    { type: "application/vnd.ms-excel" }
  );

  downloadFile(blob, "repeticiones.xls");
};

function downloadFile(blob, filename){

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

/* ============================= */
/* RENDER LOOP */
/* ============================= */

function render(){

  document.getElementById("leftCount").textContent = state.leftCount;
  document.getElementById("rightCount").textContent = state.rightCount;

  document.getElementById("pauseOverlay")
    .classList.toggle("active", state.paused);

  requestAnimationFrame(render);
}

render();

