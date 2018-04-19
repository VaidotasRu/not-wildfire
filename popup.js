//import {convertToJSON} from './functions/record.js'




function startRecording(){
    localStorage.clear(); // Reiks istrint kuomet galima bus skirti irasui varda
    //isRec = true
    	   chrome.runtime.sendMessage({type: "start"}); // Sending message to background

	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){ //Sending message to content script
    var activeTab = tabs[0];
   chrome.tabs.sendMessage(activeTab.id, {"message": "record"});
  });
}


function stopRecording(listener){

	chrome.runtime.sendMessage({type: "stop"}); //Starts replaying in a current tab
	//var newWindow = window.open('StopRecordGUI.html',null, 'left = 640, top = 300, height=200,width=200,scrollbars=yes,status=yes');
	var savedName = prompt("How would you like to name your Simulation log:", "Default");

}


function play(){

	   chrome.runtime.sendMessage({type: "Play"}); //Starts replaying in a current tab


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

function Dashboard(){

	var newWindow = window.open('Dashboard.html',null, 'height=620,width=610,scrollbars=yes,status=yes');
	//-------PAMIRSAU KUR IKELTI, SORRY!---------------
	var car = {
		myliu:"labas",
		nemyliu:"ate"
	}
	var JSONsome = JSON.stringify(car);
	var splitedIntoArray = JSONsome.split(',');
	localStorage.setItem("love",JSONsome);
	localStorage.setItem("move",splitedIntoArray);
	alert(localStorage.getItem("love"));
	alert(localStorage.getItem("move"));
	
}

/*  ---------------PERMESTA I BACKGROUNDA

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
   */


  document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('record').addEventListener('click', startRecording);
  document.getElementById('stop').addEventListener('click',stopRecording);
  document.getElementById("play").addEventListener("click", play);
  document.getElementById("dashboard").addEventListener("click", Dashboard);
});

