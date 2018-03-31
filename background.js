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
replay();
	}
});

function replay(x){
			var commands = ["input","input","input"];
var position1 = new Position(271,272);
var position2 = new Position(271,312);
var position3 = new Position(271,360);

var pos = [position1, position2, position3];

var values = ['aaa' , 'bbb', 'ccc'];

		    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
 chrome.tabs.executeScript(tabs[0].id, {file: "jquery-3.3.1.js"}); // Line is not added to injectCurrent, to prevent multiple library injections

  });
  
 for(var i = 0; i < commands.length; i++){
 injectCurrent(commands[i], pos[i].x, pos[i].y, values[i]);				
		}		
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
//------------------------------------------------------------------------------------
// Injects script into current tab
function injectCurrent(command, posX, posY, value)
{				

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){ //Passing selectors and values
    var activeTab = tabs[0];
	
if(command == "click"){
				chrome.tabs.executeScript(activeTab.id, {file: "click.js"});
}
else if(command == "input"){
				chrome.tabs.executeScript(activeTab.id, {file: "input.js"});
}

	setTimeout(function(){ }, 80); //Delay before sending a message
	chrome.tabs.sendMessage(activeTab.id, {"posX": posX, "posY": posY, "value": value});

  });
}