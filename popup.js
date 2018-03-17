
//import { convertToJSON } from './functions/record.js';



function startRecording(){
  document.body.style.backgroundColor='red';
  //var findBody = document.querySelector('body');
  //findBody.addEventListener('click', convertToJSON);
}

function stopRecording(){
  document.body.style.backgroundColor='green';
}



function play(){
  document.body.style.backgroundColor='yellow';
}
  
  
   
  document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('record').addEventListener('click', startRecording);
  document.getElementById("stop").addEventListener("click", stopRecording);
  document.getElementById("play").addEventListener("click", play);
});


