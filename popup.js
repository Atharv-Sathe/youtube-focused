const toggleBtn = document.getElementById("btn");
console.log(toggleBtn);

// Get the state of recommendations for the user from local storage
let recomStatus;
chrome.storage.sync.get(["recomStatus"], (result) => {
  recomStatus = result.recomStatus;
  // If recomStatus is true then hide the recommendations
  if (recomStatus) {
    toggleBtn.checked = true;
  } else {
    toggleBtn.checked = false;
  }
})

toggleBtn.addEventListener("click", () => {
  console.log("Toggle clicked!");
  if (toggleBtn.checked) {
    // Store the users current preference in local storage
    chrome.storage.sync.set({ recomStatus: true }); 
    sendMsg("hide-recom");
  } else {
    chrome.storage.sync.set({ recomStatus: false });
    sendMsg("unhide-recom");
  }
});

function sendMsg(command) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: command });
  });
}
