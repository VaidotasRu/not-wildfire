
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


class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function play(){

//----------BUS PAKEISTA ALGIO REGEXU-------------

//var currentColor = localStorage.getItem('defaultName');  
//var regex = new RegExp('\>(.*?)\<');
//var matched = regex.exec(currentColor);
//var r = matched[0].substring(1, matched[0].length-1);

//-----------------------------------------------------

var commands = ["input","input","input"];
var position1 = new Position(293,267);
var position2 = new Position(296,316);
var position3 = new Position(271,360);

var pos = [position1, position2, position3];
var values = ['aaa' , 'bbb', 'ccc'];
alert(values[0]);
alert(pos[0].x);
 chrome.tabs.executeScript(null, {file: "jquery-3.3.1.js"}); // Line is not added to injectCurrent, to prevent multiple library injections
for(var i = 0; i < commands.length; i++)
{
 injectCurrent(commands[i], pos[i].x, pos[i].y, values[i]);
}
}

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

// Injects script into current tab
function injectCurrent(command, posX, posY, value)
{
				
if(command == "click"){
				chrome.tabs.executeScript(null, {file: "click.js"});
}
else if(command == "input"){
				chrome.tabs.executeScript(null, {file: "input.js"});
}


    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){ //Passing selectors and values
    var activeTab = tabs[0];
	   chrome.tabs.sendMessage(activeTab.id, {"posX": posX, "posY": posY, "value": value});
  });
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

