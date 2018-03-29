
//import {convertToJSON} from './functions/record.js'
 
function findContent(e)
{
  console.log(e.target.innerHTML);
}

function startRecording(){
  // --------------- REIKIA ČIA PADARYT, KAD IMTŲ IŠ MAIN WINDOW, NE EXT TABO
  var findBody = document.querySelector('body');
  findBody.addEventListener('click',findContent);
  //var findBody = document.querySelector('body');
  //findBody.addEventListener('click', convertToJSON);
}


function stopRecording(){
  document.body.style.backgroundColor='green';

}



function play(){
  document.body.style.backgroundColor='yellow';
  
}

function Dashboard(){
	
	var newWindow = window.open('Dashboard.html',null, 'height=620,width=610,scrollbars=yes,status=yes');
	
}

  
  
   
  document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('record').addEventListener('click', startRecording);
  document.getElementById("stop").addEventListener("click", stopRecording);
  document.getElementById("play").addEventListener("click", play);
  document.getElementById("dashboard").addEventListener("click", Dashboard);
});