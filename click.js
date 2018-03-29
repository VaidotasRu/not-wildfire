var executed = false;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(!executed) // Prevents undesired re-calls of injected script
	{
	/*	alert(message.argument); //---------------IESKANT PAGAL POZICIJA PERDUODAMI KITOKIE ARGUMENTAI

		executed = true;
	if(message.argument =="UP"){
	$(":contains('UP')").click();

	}
if(message.argument =="DOWN"){
	$(":contains('DOWN')").click();
}
*/

var elem = document.elementFromPoint(message.posX, message.posY); // x, y
elem.click();

}
}
);