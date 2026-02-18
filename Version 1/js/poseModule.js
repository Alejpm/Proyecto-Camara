import { updateCounters } from "./counterModule.js";

export function initPose(video, canvas){

  const ctx = canvas.getContext("2d");

  const pose = new Pose({
    locateFile: (file) =>
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

      drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS,
        {color:'aqua', lineWidth:2});
      drawLandmarks(ctx, results.poseLandmarks,
        {color:'red', radius:3});

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

  camera.start().catch(err=>{
    console.error("Error cámara:", err);
    alert("Error cámara: " + err.message);
  });
}

