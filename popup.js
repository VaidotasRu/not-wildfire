//import {convertToJSON} from './functions/record.js'

function startRecording(){

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
  chrome.runtime.sendMessage({type: "simName", simName: savedName});
}


function play(){
	   chrome.runtime.sendMessage({type: "Play"}); //Starts replaying in a current tab
	//chrome.tabs.query({currentWindow: true, active: true}, function (tabs){ //Sending message to content script
//alert(tabs[0].id);
	//});


	   
}

function Dashboard(){

	var newWindow = window.open('Dashboard.html',null, 'height=620,width=610,scrollbars=yes,status=yes');

	
}

  document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('record').addEventListener('click', startRecording);
  document.getElementById('stop').addEventListener('click',stopRecording);
  document.getElementById("play").addEventListener("click", play);
  document.getElementById("dashboard").addEventListener("click", Dashboard);
});

