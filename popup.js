
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
	//window.open('https://www.dakkadakka.com/dakkaforum/user/login.page');
 // chrome.tabs.executeScript(null, {file: "jquery-3.3.1.js"});
  //chrome.tabs.executeScript(null, {file: "Replay_Basic.js"});

  
  $.getJSON("sample.json", function (data) {
    $.each(data, function (index, value) {
alert(value);
    });
});
  
}
  

   
  document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('record').addEventListener('click', startRecording);
  document.getElementById("stop").addEventListener("click", stopRecording);
  document.getElementById("play").addEventListener("click", play);
});


