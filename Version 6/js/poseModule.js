import { updateCounters } from "./counterModule.js";

let landmarkColor = "#00ffff";

export function setLandmarkColor(color){
  landmarkColor = color;
}

export function initPose(video, canvas){

  const ctx = canvas.getContext("2d");

  const pose = new Pose({
    locateFile: file =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
  });

  pose.setOptions({
    modelComplexity:1,
    smoothLandmarks:true,
    minDetectionConfidence:0.5,
    minTrackingConfidence:0.5
  });

  pose.onResults(results=>{

    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if(results.poseLandmarks){

      // Glow Neon Effect
      ctx.shadowBlur = 25;
      ctx.shadowColor = landmarkColor;

      drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS,
        {color: landmarkColor, lineWidth:3});

      drawLandmarks(ctx, results.poseLandmarks,
        {color: landmarkColor, radius:5});

      ctx.shadowBlur = 0;

      updateCounters(results.poseLandmarks);
    }

    ctx.restore();
  });

  const camera = new Camera(video,{
    onFrame: async ()=>{
      await pose.send({image:video});
    },
    width:640,
    height:480
  });

  camera.start();
}

