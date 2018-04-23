
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if(message.type == "URLchange"){
window.location = message.value;
	}
		 		if(message.type == "input"){
		var elem = document.elementFromPoint(message.posX, message.posY); 
elem.value = message.value;  
			}
				if(message.type == "click"){
		var elem = document.elementFromPoint(message.posX, message.posY);
elem.click(); 
	}

});

