import html2canvas from 'html2canvas';
function workflow(){
    /*html2canvas(document.body).then(function(canvas) {
        // Export the canvas to its data URI representation
        var base64image = canvas.toDataURL("image/png");
        window.open(base64image , "_blank");
    });*/
    var savedName = prompt("How would you like to name your Simulation log:", "Default");
}

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('SL').addEventListener('click', simulationLog);
    document.getElementById('EL').addEventListener('click', eventLog);
    document.getElementById("WE").addEventListener("click", workflow);
    document.getElementById("settings").addEventListener("click", settings);
  });