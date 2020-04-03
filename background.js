let refreshLoop = false;
let tabId;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
  tabId = tab.id
  checkForTimes(tabId)
  // Send a message to the active tab

  // WARNING this will add the event listener even if we aren't in this block mmkay
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.loaded) {
      console.log('I know the page has reloaded')

      if (refreshLoop) {
        console.log('asking to reload again plz')
        checkForTimes(tabId)
      }
    }

    if (request.slotsA) {
      refreshLoop = false;
    }
  });
});

function checkForTimes(id) {
  refreshLoop = true;
  chrome.tabs.sendMessage(id, {"message": "check_for_times"});
}
