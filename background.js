chrome.runtime.onInstalled.addListener(details => {
    //json 형식으로 data 저장
    if(details.reason === "install")
    {
        console.log("install")
    }
    else if(details.reason === "update")
    {
        console.log("update")
    }
})


chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
    console.log('[background] chrome.runtime.onMessage.addListener()')

    if (request.greeting === 'backgroundhello') {
        console.log("[background] request:" + request.greeting)
        // TODO
        sendResponse({ farewell: 'contentgoodbye' })
    }
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        let tabURL = tabs[0].url
        console.log("tabURL1",tabURL, tabs)
    });
})
