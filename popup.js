//import {convertToJSON} from './functions/record.js'



function startRecording(){
    localStorage.clear();
    isRec = true;
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
   chrome.tabs.sendMessage(activeTab.id, {"message": "record"});
  });
    chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
      if(isRec)
      {
        if(response.type == "html") {
           contentArray.push(response.content);
        }
        if(response.type == "event") {
          eventArray.push(response.content);
        }
      }
      else
      {
        chrome.runtime.onMessage.removeListener();
      }

});
   
}

function stopRecording(listener){
  isRec = false;
  for (i = 0; i < contentArray.length; i++) { 
      append_to_json(eventArray[i], contentArray[i], "defaultName");
  }
save("defaultName");
contentArray = [];
eventArray = [];
}




function play(){
//----------BUS PAKEISTA ALGIO REGEXU-------------
//var currentColor = localStorage.getItem('defaultName');  
//var regex = new RegExp('\>(.*?)\<');
//var matched = regex.exec(currentColor);
//var r = matched[0].substring(1, matched[0].length-1);

//-----------------------------------------------------
	   chrome.runtime.sendMessage({trigger: "start"}); //Starts replaying in a current tab

//-------------------VEIKIA SU SELECTORIAIS, NE SU POZICIJOS. THO ATEITY GALI PRIREIKT
/*
// Injects script into current tab
function injectCurrent(command, selector, value)
{
				
if(command == "click"){
				chrome.tabs.executeScript(null, {file: "click.js"});
}
else if(command == "input"){
				chrome.tabs.executeScript(null, {file: "input.js"});
}


    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){ //Passing selectors and values
    var activeTab = tabs[0];
	   chrome.tabs.sendMessage(activeTab.id, {"argument": selector});
  });
}

*/
}


function append_to_json(command, target, jsonName){

	var value = null;
		
	if(command === null || target === null)
		return false;
		
	var json = {
		"Command":command,
		"Target":target,
		"Value":value
	}
	
	var data = JSON.stringify(json);
	
	var oldJSON = localStorage.getItem(jsonName);
    if(oldJSON === null){
		oldJSON = "";
	}
    localStorage.setItem(jsonName, oldJSON + data);
}
	
	function save(jsonName){
		var json = localStorage.getItem(jsonName);
		var storage = chrome.storage.sync;
		
		storage.set({jsonName:json}, function() {});
	}

  let isRec = false;
  var contentArray = [];
  var eventArray = [];
   
  document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('record').addEventListener('click', startRecording);
  document.getElementById('stop').addEventListener('click',stopRecording);
  document.getElementById("play").addEventListener("click", play);
});

