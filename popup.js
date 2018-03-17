
//import { convertToJSON } from './functions/record.js';



function startRecording(){
  console.log("hi");
  //var findBody = document.querySelector('body');
  //findBody.addEventListener('click', convertToJSON);
}

function stopRecording(){

}

function play(){
}

document.getElementById("record").addEventListener("click", startRecording());
document.getElementById("stop").addEventListener("click", stopRecording());
document.getElementById("play").addEventListener("click", play());

