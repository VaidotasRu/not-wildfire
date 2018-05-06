alert('content');

chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) { // Attaching event listeners to HTML body element

          if (request.type == "start") {

              getPageSize(); // Saves window size at the beggining of recording
          }
          if (request.message === "record") {
              alert('recording');
              attachEventListners();
       }
      });

function findContent(e){

    if (e.type == "input") {
        chrome.runtime.sendMessage({ content: e.type, xPos: e.clientX, yPos: e.clientY, value: e.target.value, type: "save" });
    }
    else if (e.type == "scroll") {
        chrome.runtime.sendMessage({ content: e.type, xPos: window.scrollX, yPos: window.scrollX, value: null, type: "save" });
    }
 else{
        chrome.runtime.sendMessage({ content: e.type, xPos: e.clientX, yPos: e.clientY, value: null, type: "save" });
 }
  
}

window.onhashchange = recorddURLChange(); // Calls function each time page is reloaded (or URL is changed)
window.onresize = getPageSize(); // Records window's or document's resizing

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
    body.addEventListener('scroll', findContent);

}


void getPageSize(){

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, { file: "jquery-3.3.1.js" });

    });
    var height $(window).height();
    var width $(window).width();

    chrome.runtime.sendMessage({ content: "resize", xPos: width, yPos: height, value: null, type: "save" });

}

