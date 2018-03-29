chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	
alert(message.argument);
	if(message.argument =="UP"){
	$(":contains('UP')").click();
}
if(message.argument =="DOWN"){
	$(":contains('DOWN')").click();
}

}
);