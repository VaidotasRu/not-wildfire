chrome.tabs.onCreated.addListener(function(tab){
    alert("new tab "+tab.id);
});