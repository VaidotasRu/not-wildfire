// Script is injected in each page during replaying. it recieves messages from background script with events which must be triggered on a certain position with certain value
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
		
		var result = elem.hasAttribute('href'); // If element has href attribute, he won't be clicked, because url change (triggered by click) is recorded separately. 		
        if (!result) {                            //  In other case, there would be click, which would change url and after page load, he would reload again
elem.click(); 
        }
                }
                if (message.type == "scroll") {
                    window.scrollTo(message.posX, message.posY);
                }
                if (message.type == "resize") {
                    window.resizeTo(message.posX, message.posY);
                }
});

