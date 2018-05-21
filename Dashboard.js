function workflow(){

    $('.dropdown').show('show');
    $('.SL_buttons').hide();

}

function simulationLog(){

  var simulationList = JSON.parse(localStorage.getItem("namesOfSim"));
  var jsonSimulations = [];
  $('#container').empty();

  for (i = 0; i < simulationList.length; i++) { 
    $('<div class=simulationItem> <h2> '+ simulationList[i] +'</h2> <button id='+simulationList[i]+'> Play </button> <button> Edit </button> </div>').appendTo('#container');
    $('#'+simulationList[i]).click(function (e){
      executeRecord(e.target.id);
      });
  }
}

function addBtn(type){

    //Create an input type dynamically.   
    var element = document.createElement("button");
    //Assign different attributes to the element. 
    element.id = type;
    element.value = type; // Really? You want the default value to be the type string?
    element.class = "SL_buttons";
    element.name = type; // And the name too?
   /* element.onclick = function() { // Note this is a function
      alert("blabla");
    };*/

    $("#simLog").append(element);
//    var foo = document.getElementsByClassName("SL_buttons");
    //Append the element in page (in span).  
  //  document.appendChild(element);
  
}

function settings() {

}

function eventLog() {

}

function action(){

  document.getElementById("myDropdown").classList.toggle("show");

}

window.onclick = function(event) { //retracts dropdown button if pressed out side of it
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function executeRecord(recordName) {
  chrome.runtime.sendMessage({
    type: "Play",
    record: recordName,
  });
}

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('SL').addEventListener('click', simulationLog);
    document.getElementById('EL').addEventListener('click', eventLog);
    document.getElementById("WE").addEventListener("click", workflow);
    document.getElementById("settings").addEventListener("click", settings);
    document.getElementById('dropdownbtn').addEventListener('click', action);
    //document.getElementById('play').addEventListener('click', play);
  });

