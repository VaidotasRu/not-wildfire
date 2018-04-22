chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	 		if(message.type == "input"){
		var elem = document.elementFromPoint(message.posX, message.posY); 
elem.value = message.value;  
			}
});
