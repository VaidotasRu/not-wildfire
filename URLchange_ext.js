chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message.type == "URLchange"){
window.location = message.value;
	}
});
