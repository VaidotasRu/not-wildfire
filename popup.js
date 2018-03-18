
//import {convertToJSON} from './functions/record.js'



function startRecording(){
    isRec = true;
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "record"});
  });
    chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
      if(isRec)
      {
        responseArray.push(response);
        console.log(response);
      }
      else
      {
        chrome.runtime.onMessage.removeListener();
      }

});
   
}

function stopRecording(listener){
  isRec = false;
  document.getElementById('record').removeEventListener('click', startRecording);
}



function play(){
  document.body.style.backgroundColor='yellow';
}
  
  let isRec = false;
  var responseArray = [];
   
  document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('record').addEventListener('click', startRecording);
  document.getElementById('stop').addEventListener('click',stopRecording);
  document.getElementById("play").addEventListener("click", play);
});

