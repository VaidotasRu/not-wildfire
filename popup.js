
function startRecording(){


  chrome.runtime.sendMessage({type: "start"}); // Sending message to background

	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){ //Sending message to content script
    var activeTab = tabs[0];
 	chrome.tabs.sendMessage(activeTab.id, {"message": "record"});
	});
	var record = document.getElementById('record');
	record.style.backgroundColor = "lightGreen";
}

function stopRecording(listener){

	chrome.runtime.sendMessage({type: "stop"});
	//var newWindow = window.open('StopRecordGUI.html',null, 'left = 640, top = 300, height=200,width=200,scrollbars=yes,status=yes');
	var savedName = prompt("How would you like to name your Simulation log:", "Default");
	if (savedName === null)
		chrome.runtime.sendMessage({type: "canceled"});
	else
  		chrome.runtime.sendMessage({type: "simName", simName: savedName});
}


/*function play(){
  
	   chrome.runtime.sendMessage({type: "Play"}); //Starts replaying in a current tab	   

}*/

function Dashboard(){

	var newWindow = window.open('Dashboard.html',null, 'height=640,width=640,scrollbars=yes,status=yes,top=50,left=450');

	
}

  document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('record').addEventListener('click', startRecording);
  document.getElementById('stop').addEventListener('click',stopRecording);
  //document.getElementById("play").addEventListener("click", play);
  document.getElementById("dashboard").addEventListener("click", Dashboard);
});

