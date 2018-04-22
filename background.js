
//localStorage.clear();
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){

	if(response.type == "start"){ // Start recording
		isRec = true;
	}

    if(isRec){

    	if(response.type == "stop") {
			isRec = false;
		}
		else{
        	if(response.type == "html") {
           		contentArray.push(response.content); // Saving data
        	}
        	if(response.type == "event") {
          		eventArray.push(response.content);
        	}
    	}
    }
		
	if(!isRec && response.type == "simName"){
		if (contentArray.length == 0)
			alert("There's nothing to save");
		else{
		var simulation;
		if (localStorage.getItem(response.simName) === null) { //checking if the name does not exist
			simulation = response.simName;
		}
		else {
			var number = defaultNumber();
			simulation = "DefaultName" + number;
			alert("A simulation log with this name already exists. Simulation is saved by name \"" + simulation + "\"");
		}
		for(var i = 0; i < contentArray.length; i++){
				append_to_json(eventArray[i], contentArray[i], simulation); // Saving data to local storage
			}
		}
	}
		

  	if(response.type == "Play"){
		assignValues();
	}
});

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

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
var pos;
var values;
var commands;
var index;
var injectedScript = []; // Scripts that are already injected in page

// Reads data from chrome.storage and selects commands, positions and values 
function assignValues(){
	
	//-------------- bus pakeista i regex
			 commands = ["input","input","input"];
var position1 = new Position(271,272);
var position2 = new Position(271,312);
var position3 = new Position(271,360);

 pos = [position1, position2, position3];

 values = ['aaa' , 'bbb', 'ccc'];

		    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
 chrome.tabs.executeScript(tabs[0].id, {file: "jquery-3.3.1.js"}); // Line is not added to injectCurrent, to prevent multiple library injections
  });
  
callInjection(0); //Starting simulation
	
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
	console.log("setting item " + jsonName);
    localStorage.setItem(jsonName, oldJSON + data);
    console.log("item set " + localStorage.getItem(jsonName));
    contentArray = [];
    eventArray = [];
}
	

  let isRec = false;
  var contentArray = [];
  var eventArray = [];


// ---------------PAKOLKAS NEREIKIA. REIKES KAI ATKARTOSIM VEIKSMUS PER KELIS TABUS
var func = function(x){
//chrome.tabs.create({'url': "http://www.9gag.com"}, function(tab){ 
alert(x);
		    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
				chrome.tabs.executeScript(activeTab.id, {file: "Replay_Basic.js"});
	   chrome.tabs.sendMessage(activeTab.id, {"argument": x});
  });

	};
 

//-------------------------------------------------------------------

// Function is recursively called with one second gaps until it iterates through all commands
function callInjection(index){
 injectCurrent(commands[index], pos[index].x, pos[index].y, values[index]);				
	 setTimeout(function(){
		 	 if(index < commands.length){
			 callInjection(index+1);	 
	 			 }	 
	 }, 1000);		 	
	 
}

// Injects script into current tab
function injectCurrent(command, posX, posY, value)
{				

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){ //Passing selectors and values
    var activeTab = tabs[0];	
if(jQuery.inArray(command, injectedScript) !== -1) 
{
		chrome.tabs.sendMessage(activeTab.id, {"posX": posX, "posY": posY, "value": value});
}
else {
injectedScript.push(command);
	var file = command.concat("_ext.js");				
				chrome.tabs.executeScript(activeTab.id, {file: file}, function(){
										chrome.tabs.sendMessage(activeTab.id, {"posX": posX, "posY": posY, "value": value});

					});
}
  });
}


