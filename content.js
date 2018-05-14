chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) { // Attaching event listeners to HTML body element

          if (request.message == "record") {
              alert('recording');

              attachEventListners();
              var body = document.querySelector('body');
              chrome.runtime.sendMessage({ content: "scroll", xPos: body.scrollLeft, yPos: body.scrollTop, value: null, type: "save" });	
       }
      });


function findContent(e){
    if (e.type == "input") {
        var rect = document.activeElement.getBoundingClientRect();

        chrome.runtime.sendMessage({ content: e.type, xPos: rect.left, yPos: rect.top, value: e.target.value, type: "save" });
    }
    else {

        chrome.runtime.sendMessage({ content: e.type, xPos: e.pageX, yPos: e.pageY, value: null, type: "save" });
 }
  
}
window.onscroll = function(){
	
    var body = document.querySelector('body');
	chrome.runtime.sendMessage({ content: "scroll", xPos: body.scrollLeft , yPos: body.scrollTop, value: null, type: "save" });	
	};
	
window.onhashchange = recorddURLChange(); // Calls function each time page is reloaded (or URL is changed)


function recorddURLChange() {	
    chrome.runtime.sendMessage({ type: "loaded" }); // Used in replaying. Indicates that page is loaded (alternative for a call back)

        chrome.runtime.sendMessage({ content: "URLchange", xPos: 0, yPos: 0, value: window.location.href, type: "save" });

        attachEventListners(); // Reataching event listeners to newly loaded page
	
}


// Atacches event listners to DOM body element
function attachEventListners() {
    var body = document.querySelector('body');
    body.addEventListener('click', findContent);
    body.addEventListener('input', findContent);

}

