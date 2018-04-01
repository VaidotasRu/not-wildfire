class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
console.log(response + " viso gero");
//alert(response);

   if(response.trigger == "start"){
assignValues();
	}
	else{
		alert(response.trigger);
	}
	
	
	
});

var pos;
var values;
var commands;
var index;
var injectedScript = [];


function assignValues(){
			 commands = ["input","input","input"];
var position1 = new Position(271,272);
var position2 = new Position(271,312);
var position3 = new Position(271,360);

 pos = [position1, position2, position3];

 values = ['aaa' , 'bbb', 'ccc'];

		    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
 chrome.tabs.executeScript(tabs[0].id, {file: "jquery-3.3.1.js"}); // Line is not added to injectCurrent, to prevent multiple library injections
  });
  
callInjection(0);
	
}

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

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "startFunc")

			func(request.arg);
    }
);

function callInjection(index){
 injectCurrent(commands[index], pos[index].x, pos[index].y, values[index]);				
	 setTimeout(function(){
		 	 if(index < commands.length){
			 callInjection(index+1);	 
	 			 }

	 
	 }, 1000);
		 	
			 
	 
	 
}

//------------------------------------------------------------------------------------
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