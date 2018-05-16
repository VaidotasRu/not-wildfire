function workflow(){

    $('#action').toggle("show");
    $('.dropdown').toggle("show");
}

function simulationLog(){

  $('.SL_buttons').toggle("show");

}



function settings() {

}

function eventLog() {

}

function action(){

  document.getElementById("myDropdown").classList.toggle("show");

}

window.onclick = function(event) {
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
    document.getElementById('play').addEventListener('click', play);
  });

