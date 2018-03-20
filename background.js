

var func = function(){
chrome.tabs.create({'url': "http://www.9gag.com"}, function(tab){ 
chrome.tabs.executeScript(null, {file: "tmp.js"});
//$("*").hide();
//alert('gg');
//alert(tab.id);
})

	};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "startFunc")
			func();
    }
);