var body = document.querySelector('body');
              body.addEventListener('click', findContent);
              body.addEventListener('input', findContent);

              body.addEventListener('submit', findContent);

              chrome.runtime.sendMessage({ content: "scroll", xPos: body.scrollLeft, yPos: body.scrollTop, value: null, type: "save" });	

function findContent(e){
    if (e.type == "submit") {
        alert('submit');
    }
    if (e.type == "click") {
        if (xPos != 0 || yPos != 0) {
            chrome.runtime.sendMessage({ content: e.type, xPos: e.pageX, yPos: e.pageY, value: null, type: "save" });
        }
    }
    else {
		    var rect = document.activeElement.getBoundingClientRect();
	 
	chrome.runtime.sendMessage({ content: e.type, xPos: rect.left, yPos: rect.top, value: e.target.value, type: "save" });
    	
	}
  
}


window.onscroll = function(){
	
    var body = document.querySelector('body');
	chrome.runtime.sendMessage({ content: "scroll", xPos: body.scrollLeft , yPos: body.scrollTop, value: null, type: "save" });	
	};
	
