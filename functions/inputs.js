function inputs(x, y){
	var element = document.elementFromPoint(x, y);
	var value = null;
	
	if(element.nodeName == "input"){
		value = element.value;
	}
	
	return value;
}