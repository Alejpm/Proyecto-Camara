export const state = {
  leftUp:false,
  rightUp:false,
  leftCount:0,
  rightCount:0,
  paused:false
};

export function updateCounters(landmarks){

  if(state.paused) return;

  const leftWrist = landmarks[15];
  const rightWrist = landmarks[16];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];

  if(leftWrist.y < leftShoulder.y){
    if(!state.leftUp){
      state.leftUp = true;
      state.leftCount++;
    }
  } else {
    state.leftUp = false;
  }

  if(rightWrist.y < rightShoulder.y){
    if(!state.rightUp){
      state.rightUp = true;
      state.rightCount++;
    }
  } else {
    state.rightUp = false;
  }
}

export function resetCounters(){
  state.leftCount = 0;
  state.rightCount = 0;
}

export function resetLeft(){
  state.leftCount = 0;
}

export function resetRight(){
  state.rightCount = 0;
}

export function pauseCounting(){
  state.paused = true;
}

export function resumeCounting(){
  state.paused = false;
}

