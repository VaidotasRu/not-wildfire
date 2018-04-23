chrome.tabs.onCreated.addListener(function(tab) {   // Records creation of a tab

  if(isRec){
  eventArray.push("newTab");
var id = tab.id;
recordTabs.push(id);
recordX.push(0);
recordY.push(0);

  valueArray.push(recordTabs.length -1);
  }
});

chrome.tabs.onHighlighted.addListener(function(tabs) { // Records tab switch
  if(isRec){
	  var x = recordTabs.indexOf(parseInt(tabs.tabIds));

		   eventArray.push("tabSwitch");
           recordX.push(0);
           recordY.push(0);
  valueArray.push(x);
  }		
});


var waitForPageLoad = false; // Stops replaying while page is loading
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){

if(response.type == "loaded"){ // Indicates that page is loaded
	waitForPageLoad = false; 
}

  if(response.type == "Play"){ // Replaying
   replayTabs = [];
  

 scriptInjected = false;
 waitForPageLoad = false;
 chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) { //Sending message to content script
     var activeTab = tabs[0];
     replayTabs.push(activeTab.id);
 });

 assignValues();
	}

if(response.type == "start"){ // Start recording

    contentArray = [];
    eventArray = [];
    valueArray = [];
recordTabs = [];
	isRec = true;
	var tabId;
			chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
   tabId = tabs[0].id;		
   recordTabs.push(tabId);

		});  
}

      if(isRec){
        if(response.type == "save") {  // Saving data
            eventArray.push(response.content);
            recordX.push(response.xPos);
            recordY.push(response.yPos);
            valueArray.push(response.value);
        }   

		        if(response.type == "stop") {
					isRec = false;
				}
}

if(!isRec && response.type == "simName"){
		RecordSimulation(response.simName);
	}


});

var index; //Indexes for arrays containing commands positions and values.

function RecordSimulation(name) {
    if (eventArray.length == 0)
		alert("There's nothing to save");
	else{
	var simulation;
	if (localStorage.getItem(name) === null) { //checking if the name does not exist
		simulation = name;
	}
	else {
		var number = defaultNumber();
		simulation = "DefaultName" + number;
		alert("A simulation log with this name already exists. Simulation is saved by name \"" + simulation + "\"");
	}

	for(var i = 0; i < eventArray.length; i++){
		append_to_json(eventArray[i], recordX[i], recordY[i], valueArray[i], simulation); // Saving data to local storage
		}
	}
}

function defaultNumber() {
	var lastNumber = localStorage.getItem("alldefaultnumbers");
    if(lastNumber === null){
		lastNumber = 1;
	}
    //checking if simulation with this name exists
	while (localStorage.getItem("DefaultName" + lastNumber) !== null)
		lastNumber++;
    localStorage.setItem("alldefaultnumbers", lastNumber);
    return lastNumber;
}

var scriptInjected = false; // Scripts that are already injected in page
var Commands = [];
var PositionX = [];
var PositionY = [];
var Values = [];
var Replaying = false;
var recordTabs = [];
var replayTabs = [];

function DataParsing(){
	var temp_records = (localStorage.getItem("Default")).split(";");

for(var i = 0; i < temp_records.length-1; i++)
{

var object = JSON.parse(temp_records[i]);
Commands[i] = object.Command;
PositionX[i] = object.X;
PositionY[i] = object.Y;
Values[i] = object.Value;
}
}

// Reads data from chrome.storage and selects commands, positions and values 
function assignValues(){

DataParsing();

callInjection(0); //Starting simulation
	
}

function append_to_json(command, x,y , value, jsonName){

	if(command === null)
		return false;
		
	var json = {
		"Command":command,
        "X": x,
        "Y": y,
		"Value":value
	}
	
	var data = JSON.stringify(json);
	
	var oldJSON = localStorage.getItem(jsonName);
    if(oldJSON === null){
		oldJSON = "";
	}

    localStorage.setItem(jsonName, oldJSON + data + ";");

}
	
  let isRec = false;
  //var contentArray = [];
var recordX = [];
var recordY = [];
  var eventArray = [];
  var valueArray = [];
 
function injectScript(){		   
		   chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
			chrome.tabs.executeScript(activeTab.id, {file: "Replay.js"});

  });

}

// Function is recursively called with one second gaps until it iterates through all commands
function callInjection(index){
	

	if(!scriptInjected){
		injectScript();
		scriptInjected = true;
    }
if(!waitForPageLoad) 
{
    sendMessage(Commands[index], PositionX[index], PositionY[index], Values[index]);	

	 setTimeout(function(){
		 	 if(index < Commands.length){
			 callInjection(index+1);	 
	 			 }	 
	 }, 1000);		 	
} else // If page is not loaded yet, function tries to call itself each 0.5sec
{
		 setTimeout(function(){
			 callInjection(index);	 
	 }, 500);	
    }

}

// Sends message with command positions and value to injected script
function sendMessage(command, posX, posY, value) {
    if (command == "URLchange" || command == "newTab") {
        scriptInjected = false;
        waitForPageLoad = true;
    }
    if (command == "tabSwitch") {
        switchTab(value);
    } else if (command == "newTab") {
        createNewTab();
    } else {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) { //Sending message to content script
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "type": command, "posX": posX, "posY": posY, "value": value });
        });
    }
}


function createNewTab(){

    chrome.tabs.create({ 'url': "https://www.google.lt/"}, function(tab){ 
        replayTabs.push(tab.id);
  });

	}

function switchTab(tabIndex) {
    var index = parseInt(tabIndex);

    tabId = replayTabs[index];
    chrome.tabs.get(tabId, function (tab) {
        chrome.tabs.highlight({ 'tabs': tab.index }, function () { });
    });   
	}
 



