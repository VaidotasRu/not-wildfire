
//import {convertToJSON} from './functions/record.js'


function findContent(e)
{
  console.log(e.target.innerHTML);
}

function startRecording(){
  // --------------- REIKIA ČIA PADARYT, KAD IMTŲ IŠ MAIN WINDOW, NE EXT TABO
  var findBody = document.querySelector('body');
  findBody.addEventListener('click',findContent);
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "record"});
  });
    chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
console.log(response);
});
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

