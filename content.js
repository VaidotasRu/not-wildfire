chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) { // Attaching event listeners to HTML body element

        //  alert('ms');

          if (request.message === "record") {
         	var findBody = document.querySelector('body');
		findBody.addEventListener('click',findContent);
        findBody.addEventListener('input', findContent);
       }
      });

function findContent(e){
  //  alert(e.type);
 //   alert(e.pageX);
   
    if (e.type != "input") {
        chrome.runtime.sendMessage({ content: e.type, xPos: e.clientX, yPos: e.clientY, value: null, type: "save" });
 }
 else{
        chrome.runtime.sendMessage({ content: e.type, xPos: e.clientX, yPos: e.clientY, value: e.target.value, type: "save" });
 }
  
}

window.onhashchange = recorddURLChange(); // Calls function each time page is reloaded (or URL is changed)

function recorddURLChange() {	
   // alert('change');
		chrome.runtime.sendMessage({type: "loaded"}); // Used in replaying. Indicates that page is loaded (alternative for a call back)
        chrome.runtime.sendMessage({ content: "URLchange", xPos: 0, yPos: 0, value: window.location.href, type: "save" });

  var findBody = document.querySelector('body'); // Reataching event listeners to newly loaded page
  			findBody.addEventListener('click',findContent);
			  			findBody.addEventListener('input',findContent);		
}

