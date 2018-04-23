chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) { // Attaching event listeners to HTML body element
	   if( request.message === "record" ) {
         	var findBody = document.querySelector('body');
  			findBody.addEventListener('click',findContent);
			findBody.addEventListener('input',findContent);

		}
      });

function findContent(e){
  chrome.runtime.sendMessage({ content: e, type: "html"});
  chrome.runtime.sendMessage({ content: e, type: "event"});
 if(e.type != "input" && e.type != "URLchange"){
	  chrome.runtime.sendMessage({ content: null, type: "value"}); // Clicks and many other events don't require "value" field
 }
 else{
 chrome.runtime.sendMessage({ content: e.target.value, type: "value"});
 }
  
}

window.onhashchange = recorddURLChange(); // Calls function each time page is reloaded (or URL is changed)

function recorddURLChange()
{	
		chrome.runtime.sendMessage({type: "loaded"}); // Used in replaying. Indicates that page is loaded (alternative for a call back)
		
	  chrome.runtime.sendMessage({ content: window.location.href, type: "value"});
  chrome.runtime.sendMessage({ content: "URLchange", type: "event"});
  chrome.runtime.sendMessage({ content: null, type: "html"});

  var findBody = document.querySelector('body'); // Reataching event listeners to newly loaded page
  			findBody.addEventListener('click',findContent);
			  			findBody.addEventListener('input',findContent);		
}
