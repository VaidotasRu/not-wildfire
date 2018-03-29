var executed = false;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(!executed) // Prevents undesired re-calls of injected script
	{	alert(message.value);
var elem = document.elementFromPoint(message.posX, message.posY); // x, y
elem.value = message.value;

	}
}
);