chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	alert(message.value);
var elem = document.elementFromPoint(message.posX, message.posY); // x, y
elem.value = message.value;


}
);