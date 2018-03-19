
//import {convertToJSON} from './functions/record.js'
//import {append_to_json} from './functions/to_json.js'
//import {save} from './functions/to_json.js'
 
 
 
function findContent(e)
{
    append_to_json(e, "jsonas");
  console.log(e.target.innerHTML);
}
 
function startRecording(){
  // --------------- REIKIA ČIA PADARYT, KAD IMTŲ IŠ MAIN WINDOW, NE EXT TABO
  var findBody = document.querySelector('body');
  findBody.addEventListener('click',findContent);
  //var findBody = document.querySelector('body');
  //findBody.addEventListener('click', convertToJSON);
}
 
function stopRecording(){
  document.body.style.backgroundColor='green';
    save("jsonas");
}
 


function play(){
	
	window.open();
	
  //  chrome.tabs.create({ url: "http://www.9gag.com"}, function(tab) {
//window.open();
	//    chrome.tabs.executeScript(tab.id, { file: "tmp.js" });
  //  });
 //var a = "fffffffff";//inject("dd");

	//chrome.tabs.create({url: 'http://www.9gag.com'}//, function(tab) {
	//	chrome.tabs.executeScript(tab.id, {file: "inject.js"});
//	});
	
	
 
//var x = "alert('ggg')";
 //var a = inject(x);

 
  
  chrome.tabs.executeScript(null, {file: "jquery-3.3.1.js"});
  chrome.tabs.executeScript(null, {file: "Replay_Basic.js"});
  //chrome.tabs.create({url: 'http://google.ca'});
	//chrome.tabs.create({url: 'http://www.9gag.com'}, function(tab) {
       //alert('ddd');
	//    console.log(tab.id);
		//chrome.tabs.executeScript(tab.id, {file: "tmp.js"});
	
  }

 function inject(x)
 {
	 var a = "<script>";
	 
	 var r = a.concat(x);
	 var c = r.concat("</script>")
	 return c;
 }
   
  document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('record').addEventListener('click', startRecording);
  document.getElementById("stop").addEventListener("click", stopRecording);
  document.getElementById("play").addEventListener("click", play);
});
 
 function append_to_json(event, jsonName){
    var command = event.type;
    var target = event.target.innerHTML;
    var value = null;
       
    if(command === null || target === null)
        return false;
       
    var json = {
        "Command":command,
        "Target":target,
        "Value":value
    }
   
    var data = JSON.stringify(json);
   
    var oldJSON = localStorage.getItem(jsonName);
    if(oldJSON === null){
        oldJSON = "";
    }
    localStorage.setItem(jsonName, oldJSON + data);
}
   
     function save(jsonName){
        var json = localStorage.getItem(jsonName);
        var storage = chrome.storage.sync;
       
        storage.set({jsonName:json}, function() {});
    }