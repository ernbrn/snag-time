// Injected into every page visited

window.onload = function () {
  chrome.runtime.sendMessage({loaded: true}, function () {
    console.log("let background know I'm loaded")
  });
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "check_for_times") {
      const alertContainer = document.getElementsByClassName("a-alert-heading");

      if (!!alertContainer) {
        const no = alertContainer[0];
        if (!!no) {
          location.reload()
        }
      } else {
        chrome.runtime.sendMessage({slotsA: true}, function () {
          alert("HEY THERE ARE TIMES AVAILABLE")
          console.log('told background there are times available')
        })
      }
    }
  }
);


/*

background listens for click --> tells script to check page and reload if it's not there

script lets background know when it's done refreshing (actually anytime it's loaded, but we'll only care if we are in a refresh loop)

background needs to know that it is in a refresh loop

script now loses context of what it needs to do


*/