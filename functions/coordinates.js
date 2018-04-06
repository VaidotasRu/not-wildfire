export function append_to_json(event, jsonName){
	var x = event.clientX;
	var y = event.clientY;
		
	if(x === null || y === null)
		return false;
		
	var json = {
		"X":x,
		"Y":y
	}
	
	var data = JSON.stringify(json);
	
	var oldJSON = localStorage.getItem(jsonName);
    if(oldJSON === null){
		oldJSON = "";
	}
    localStorage.setItem(jsonName, oldJSON + data);
}
	
	export function save(jsonName){
		var json = localStorage.getItem(jsonName);
		var storage = chrome.storage.sync;
		
		storage.set({jsonName:json}, function() {});
	}