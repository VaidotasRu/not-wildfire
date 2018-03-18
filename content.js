chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "record" ) {
         	var findBody = document.querySelector('body');
  			findBody.addEventListener('click',findContent);
        }
      });

function findContent(e){
	var a = e.target.innerHTML;
	chrome.runtime.sendMessage(a);
}