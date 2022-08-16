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
        let tabURL = tabs[0].url;
        console.log("tabURL",tabURL);
    });
})
