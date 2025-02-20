console.log("content.js loaded...");

// Get the users the state of recommendations from local storage
function setDefRecom() {
  const recommendationsDivRight = document.getElementById("secondary");
  let recomStatus;
  chrome.storage.sync.get(["recomStatus"], (result) => {
    recomStatus = result.recomStatus;
    console.log(recomStatus);
    if (recomStatus) {
      console.log(recommendationsDivRight);
      hideRecoms(recommendationsDivRight);
    } else {
      console.log(recommendationsDivRight);
      unhideRecoms(recommendationsDivRight);
    }
  });
}
setTimeout(setDefRecom, 5000);

function hideRecoms(recommendationsDiv) {
  console.log("hiding recommendations...");
  recommendationsDiv.style.display = "none";
}

function unhideRecoms(recommendationsDiv) {
  console.log("unhiding recommendations...");
  recommendationsDiv.style.display = "block";
}

chrome.runtime.onMessage.addListener((message) => {
  const recommendationsDivBottom = document.querySelectorAll("#contents")[5]; // bottom layout
  const recommendationsDivRight = document.getElementById("secondary"); // right layout
  if (message.action === "hide-recom") {
    hideRecoms(recommendationsDivBottom);
    hideRecoms(recommendationsDivRight);
  } else if (message.action === "unhide-recom") {
    unhideRecoms(recommendationsDivBottom);
    unhideRecoms(recommendationsDivRight);
  }
});
