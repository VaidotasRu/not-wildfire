
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
<<<<<<< HEAD
	//var currentColor = localStorage.getItem('defaultName');
	
//	var regex = new RegExp('\>(.*?)\<');
//var matched = (regex.exec(currentColor)).substring(1, 3);

//var res = matched.substring(1, 3);
//alert(matched);
	//	  chrome.tabs.executeScript(null, {file: "jquery-3.3.1.js"});
      //    chrome.tabs.executeScript(null, {file: "Replay_Basic.js"});
		
//		chrome.tabs.create({url: 'http://www.9gag.com'}, function(tab) {
	//	chrome.tabs.executeScript(tab.id, {file: "tmp.js"});
	//});
	
	//-----------------
	
    chrome.extension.sendMessage({ msg: "startFunc" });
//ar x = "fff>ddd<fgg"
//	var extract = currentColor.match("/{(.*)}/").pop();
		  chrome.tabs.executeScript(null, {file: "jquery-3.3.1.js"});

   var currentColor = localStorage.getItem('defaultName');
	var regex = new RegExp('\>(.*?)\<');
var matched = regex.exec(currentColor);


var r = matched[0].substring(1, matched[0].length-1);
//var res = matched.substring(1, 3);
		alert(r);

//		chrome.tabs.create({url: 'http://www.9gag.com'}, function(tab) {

	//});
	
	//-----------------
			chrome.tabs.executeScript(null, {file: "Replay_Basic.js"});
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
   chrome.tabs.sendMessage(activeTab.id, {msg: r});
  });

  //  chrome.extension.sendMessage({ msg: "startFunc", arg: r});
>>>>>>> Edgar

	//------------------
	
	//alert(tabs[0].id);   

	
//chrome.tabs.create({url: 'http://www.9gag.com'}, function(tab) {
//		chrome.tabs.executeScript(tab.id, {file: "tmp.js"});
//	});
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

