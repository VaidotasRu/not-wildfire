var executed = false;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(!executed) // Prevents undesired re-calls of injected script
	{	
var elem = document.elementFromPoint(message.posX, message.posY); // x, y
elem.value = message.value;
	}
});
