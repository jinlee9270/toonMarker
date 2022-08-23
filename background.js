chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
    // console.log("request",request)
    
    if (request.cmd == "getURL"){
        // console.log(sender)
        sendResponse({frompopup: sender.url})
    }
})
