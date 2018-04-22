chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

	if(message.type == "click"){

		var elem = document.elementFromPoint(message.posX, message.posY);
elem.click(); 
	}
});