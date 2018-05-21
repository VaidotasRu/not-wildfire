var index; //Indexes for arrays containing commands positions and values.
var waitForPageLoad = false; // Stops replaying while page is loading
var scriptInjected = false; // Helps to find out when REplay.js script re-injection is required
var Commands = []; //...
var PositionX = [];//...  Parsed data from local storage is stored in these arrays during replaying
var PositionY = [];//...
var Values = [];   //...
var recordTabs = [];  // ID of each created tab is saved in recordTabs, but only their index in the array are saved in local storage, because during replaying each...
var replayTabs = [];  // ...  tab will have different ID, but their IDs will be saved in replayTabs in the same order as during recording. AS a result, index of 1 ...
                      // ... reffers to tab from where recording has started, 2 - second opened tab, 3 - third oepened tab.

let isRec = false; // Indicates that extension records user's actions
var recordX = [];    //
var recordY = [];    // REcording data is saved here temporarely before it will be uploaded to local storage
var eventArray = []; //
var valueArray = []; //
var simNames = []; // Names of all simulations which are saved in local storage
var currentURL = "";
var skipActionRecord = false; // Allows to separate url change record from page reload

var alarmDelay, alarmPeriod, alarmName, alarmNumber, currentNumber;
// MESSAGE LISTENER. RECIEVES MESSAGES REQUIRED FOR RECORDING AND REPLAYING

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    //if (response.type == "loaded") { // Indicates that page is loaded. Used during replaying
  //      waitForPageLoad = false;
  //  }

    if (response.type == "Play") { // Replaying
        replayTabs = [];
        index = 0;
        scriptInjected = false;
        waitForPageLoad = false;
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {// Saving id of tab from which replaying will start
            var activeTab = tabs[0];
            replayTabs.push(activeTab.id);
        });
		
		promptAlarm();
		if(alarmDelay == 0 || alarmPeriod == 0)
        StartReplay();
    }

    if (response.type == "start") { // Start recording

        contentArray = []; // Clearing arrays before new recording
        eventArray = [];
        valueArray = [];
        recordTabs = [];
        recordX = [];
        recordY = [];
        isRec = true;
        skipActionRecord = false;
        currentURL = "";
        var tabId;
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            currentURL = tabs[0].url;
            recorddURLChange(tabs[0].url);
            recordTabs.push(tabs[0].id); //Saving Id of first tab
        });
    }

    if (isRec) {
        if (response.type == "save") {  // Saving data

            if (response.content == "scroll") { // Prevention of unnecessary scroll input and resize events saving
                checkScroll(response.xPos, response.yPos) 
            }
            else if (response.content == "input") {
                checkInput(response.xPos, response.yPos, response.value); 
            }
            else {
                eventArray.push(response.content); // Standart event saving
                recordX.push(response.xPos);
                recordY.push(response.yPos);
                valueArray.push(response.value);
            }
        }

        if (response.type == "stop") {
            isRec = false;
        }
    }


if(!isRec && response.type == "canceled" && eventArray.length != 0){
	alert("Simulation has not been saved");
	EmptyArrays();
}

    if (!isRec && response.type == "simName") {
		alarmName = response.simName;
		SaveSimulationRecord(response.simName);
		EmptyArrays();
	}


});

//ALARMS
chrome.alarms.onAlarm.addListener(function( alarm ) {
	if(currentNumber < alarmNumber){
		StartReplay();
		currentNumber++;
	}
	else
	{
		clearAlarm(alarmName);
	}
});

function createAlarm(name, delay, period, number){
	if(delay != 0 && period != 0){
	chrome.alarms.create(name, {delayInMinutes: delay, periodInMinutes: period});
	}
}

function clearAlarm(name){
	chrome.alarms.clear(name);
}

function promptAlarm(){
	alarmDelay = prompt("Enter alarm delay (in minutes) or leave '0' if you don't want to create it", 0);
	
	while(isNaN(alarmDelay)) {
		alarmDelay = prompt("A number is required", 0);
	}
	
	alarmDelay = parseFloat(alarmDelay);

		if(alarmDelay != 0){
			alarmPeriod = prompt("Enter alarm period (in minutes)");
			
			while(isNaN(alarmPeriod)) {
				alarmPeriod = prompt("A number is required");
			}
			
			alarmPeriod = parseFloat(alarmPeriod);
			
			alarmNumber = prompt("How many times should alarm execute?", 1);
			
			while(isNaN(alarmNumber)) {
				alarmNumber = prompt("A number is required");
			}
			
			alarmNumber = parseInt(alarmNumber);
		}
		createAlarm(alarmName, alarmDelay, alarmPeriod);
		currentNumber = 0;
}
//END OF ALARMS

// RECORDING
//---------------------------------------------------------------------------------------------

//  NAMING AND SAVING SIMULATION'S RECORDED EVENTS POSITIONS AND VALUES 
function SaveSimulationRecord(name) {
    if (eventArray.length == 0)
		alert("There's nothing to save");
	else{
    var simulation;
    var jsonNames;
	if (localStorage.getItem(name) === null) { //checking if the name does not exist
        simulation = name;

        jsonNames = JSON.parse(localStorage.getItem('namesOfSim'));
        if (jsonNames == null) {
            jsonNames = [];
        }
        jsonNames.push(simulation);

        localStorage.setItem('namesOfSim', JSON.stringify(jsonNames));
	}
	else {
		var number = defaultNumber();
        simulation = "DefaultName" + number;
        jsonNames = JSON.parse(localStorage.getItem('namesOfSim'));
        if (jsonNames == null) {
            jsonNames = [];
        }
        jsonNames.push(simulation);

        localStorage.setItem('namesOfSim', JSON.stringify(jsonNames));

		alert("A simulation log with this name already exists. Simulation is saved by name \"" + simulation + "\"");
    }
    for (var i = 0; i < eventArray.length; i++) { // Eah action will be appended to local storage item separately
		appendtoLocalStorageItem(eventArray[i], recordX[i], recordY[i], valueArray[i], simulation); 
		}
	}
}

// Appends data to local storage item. If item doesn't exist, it is created.
function appendtoLocalStorageItem(command, x, y, value, itemName) {
    if (command === null)
        return false;

    var json = {
        "Command": command,
        "X": x,
        "Y": y,
        "Value": value
    }

    var data = JSON.stringify(json);

    var oldItem = localStorage.getItem(itemName); 
    if (oldItem === null) {
        oldItem = "";
    }

    localStorage.setItem(itemName, oldItem + data + ";"); // Eah action is appended separately

}

function EmptyArrays()
{
    eventArray = [];
    recordX = [];
    recordY = [];
    valueArray = [];
recordTabs = [];
}

// Creates number for default name of simulation
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

// Detects url changes
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {

    if (info.status == 'complete') { 
        waitForPageLoad = false;
    }

    if (isRec) {

        if (info.status == 'complete') { //status == complete means that page finished loading
       if (skipActionRecord) {
                        skipActionRecord = false;
                    }
                    else {
                        recorddURLChange(currentURL);
                        injectContent();
            }
        }
                if (info.url != undefined && info.url != "chrome://newtab/") { // Event is fired for each iFrame
                skipActionRecord = true;
                currentURL = info.url;
                recorddURLChange(info.url);
                injectContent();
            }
        }
    
}); 

function recorddURLChange(url) {

    eventArray.push("URLchange");
    recordX.push(0);
    recordY.push(0);
    valueArray.push(url); 

}

// Records creation of new tab
chrome.tabs.onCreated.addListener(function (tab) {  

    if (isRec) {
        eventArray.push("newTab");
        var id = tab.id;
        skipActionRecord = true;
        recordTabs.push(id); // ID of each created tab is saved in array...

        recordX.push(0);
        recordY.push(0);

        valueArray.push(recordTabs.length - 1); // ... but only index of tab's ID in recordTabs will be saved in local storage.
    }
});

// Records tab switch
chrome.tabs.onHighlighted.addListener(function (tabs) { // Records tab switch
    if (isRec) {
        var tabIndex = recordTabs.indexOf(parseInt(tabs.tabIds)); // Getting index of tab's ID in recordTabs array.

        eventArray.push("tabSwitch");
        recordX.push(0);
        recordY.push(0);
        valueArray.push(tabIndex); 
    }
});

// Prevents saving of many scroll events in a row. At the end only one event with last scroll position is saved
function checkScroll(posX, posY) {
    if (eventArray[eventArray.length - 1] == "scroll") { // Cheking if previous event also was a scroll
        recordX[recordX.length - 1] = posX; // if yes - we overwrite scroll positions
        recordY[recordY.length - 1] = posY;
    }
    else {
        eventArray.push("scroll"); // in other case we just save event normally
        recordX.push(posX);
        recordY.push(posY);
        valueArray.push("");
    }


}

// Prevents saving of many input events in a row. At the end only one event with final input value is saved
function checkInput(posX, posY, value) {

    if (eventArray[eventArray.length - 1] == "input" && recordX[recordX.length - 1] == posX && recordY[recordY.length - 1] == posY) { // cheking if previous event also was an input..
        valueArray[valueArray.length - 1] = value;    // if yes, we just overwrite previous last value in ValueArray                                                                                        // and if it has same coordinates
    }
    else {
        eventArray.push("input"); // in other case we save input event normally
        recordX.push(posX);
        recordY.push(posY);
        valueArray.push(value);
    }
}

// REPLAYING

//---------------------------------------------------------------------------------------------

// Reads and parses data from local storage before replaying
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
function StartReplay(){

DataParsing(); 

callInjection(0); //Starting simulation
	
}

 //Injecting script which will trigger part of the events during simulation replay
function injectReplay() {
    if (!waitForPageLoad) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, { file: "jquery-3.3.1.js" });
            chrome.tabs.executeScript(tabs[0].id, { file: "Replay.js" }, function () {
                callInjection(index); // After script was injected, replay will continue
            });

        });
    } else // If page is not loaded yet, function tries to call itself each 0.5sec
    {
        setTimeout(function () {
            injectReplay();
        }, 500);
    }
}

// Function is recursively called with one second gaps until it iterates through all commands
function callInjection(param_index) {
    index = param_index;

    if (!scriptInjected) { // Cheking if re-injection of Replay.js is required
       // waitForPageLoad = true;
        scriptInjected = true;
        injectReplay();
    }
 else if (!waitForPageLoad) {

            sendMessage(Commands[index], PositionX[index], PositionY[index], Values[index]);

            setTimeout(function () {
                if (index < Commands.length) {
                    callInjection(index + 1);
                }
            }, 1000);
        } else // If page is not loaded yet, function tries to call itself each 0.5sec
        {
            setTimeout(function () {
                callInjection(index);
            }, 500);
        }
    }
//}

// Sends message with command positions and value to injected script
function sendMessage(command, posX, posY, value) {
    if (command == "URLchange" || command == "newTab") {
        scriptInjected = false;
        waitForPageLoad = true;

    }
    if (command == "tabSwitch") { // TAb switches and openings are done from extension and don't require message sending to injected script
        switchTab(value);
    } else if (command == "newTab") {
        createNewTab();
    } else {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) { //Sending message to injected script
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "type": command, "posX": posX, "posY": posY, "value": value });
        });
    }
}

// During replaying new tabs are created from extension
function createNewTab(){

    chrome.tabs.create({ 'url': "https://www.google.lt/"}, function(tab){  // Any website must be opened when creating new tab, because it is imposible to inject script into blank tab 
                                                                           // and it might stop simulation replaying. Google is choosen as default website.
        replayTabs.push(tab.id); // ID of newly created tab is saved
  });

}

// During replaying tabs are switched from extension
function switchTab(tabIndex) {
    var index = parseInt(tabIndex);
    tabId = replayTabs[index];
    chrome.tabs.get(tabId, function (tab) {
        chrome.tabs.highlight({ 'tabs': tab.index }, function () { });
    });   
	}

function injectContent() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: "content.js" }, function () {
        });

    });
}



