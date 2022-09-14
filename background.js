chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
    
    if (request.cmd == "getURL"){
        sendResponse({frompopup: sender.url})
    }
})
