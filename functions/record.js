// find body element
var findBody = document.querySelector('body');

// define handler function
function convertToJSON(event) {
  var commandObj = {Command: event.type, Target: event.target.innerHTML};
  var jsonObj = JSON.stringify(commandObj);
  localStorage.setItem("commandJSON");
}


// attach event handler
findBody.addEventListener('click', convertToJSON);


// function findPOS(elem)
// { 
//    var pos;
//    var currElem = document.elem;

//    return pos;
// }
