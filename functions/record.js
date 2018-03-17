
  export function convertToJSON(event) {
  console.log(event.target.innerHTML);
  var commandObj = {Command: event.type, Target: event.target.innerHTML};
  var jsonObj = JSON.stringify(commandObj);
  localStorage.setItem("commandJSON", jsonObj);
}

