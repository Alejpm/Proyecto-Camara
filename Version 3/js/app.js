import { initPose } from "./poseModule.js";
import { state } from "./counterModule.js";
import { startVoice } from "./voiceModule.js";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

video.addEventListener("loadedmetadata",()=>{
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});

initPose(video, canvas);

window.startVoice = startVoice;

function render(){

  document.getElementById("leftCount").textContent = state.leftCount;
  document.getElementById("rightCount").textContent = state.rightCount;

  const leftCard = document.getElementById("leftCard");
  const rightCard = document.getElementById("rightCard");

  leftCard.classList.toggle("active-left", state.leftUp);
  rightCard.classList.toggle("active-right", state.rightUp);

  requestAnimationFrame(render);
}

render();

