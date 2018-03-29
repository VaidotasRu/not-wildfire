

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
console.log(response + " viso gero");
//alert(response);
});

var func = function(x){
//chrome.tabs.create({'url': "http://www.9gag.com"}, function(tab){ 



		chrome.tabs.executeScript(null, {file: "Replay_Basic.js"});
		    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
   chrome.tabs.sendMessage(activeTab.id, {"argument": x});
  });

	};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "startFunc")

			func(request.arg);
    }
);