function workflow(){

    $('.dropdown').show('show');
    $('.SL_buttons').hide();

}

function simulationLog(){

  $('.dropdown').hide();
  $('.SL_buttons').show('show');

  var namesOfSimulations = JSON.parse(localStorage.getItem('namesOfSim'));
  /*for(var i = 0; i < namesOfSimulations.length; i++){

    btn[i] = document.createElement('BUTTON');
    $(btn[i]).attr('class', 'SL_buttons');
    $(btn[i]).attr('id', namesOfSimulations[i]);
    $(btn[i]).attr('name', namesOfSimulations[i]);
    $(btn[i]).attr('value', namesOfSimulations[i]);
    btn[i].value = namesOfSimulations[i];

  }*/
  alert(namesOfSimulations.length);
  for(var i = 0; i < namesOfSimulations.length; i++)
  {
    addBtn(namesOfSimulations[i]);
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

function play(){
  chrome.runtime.sendMessage({type: "Play"}); //Starts replaying in a current tab
}

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('SL').addEventListener('click', simulationLog);
    document.getElementById('EL').addEventListener('click', eventLog);
    document.getElementById("WE").addEventListener("click", workflow);
    document.getElementById("settings").addEventListener("click", settings);
    document.getElementById('dropdownbtn').addEventListener('click', action);
    //document.getElementById('play').addEventListener('click', play);
  });

