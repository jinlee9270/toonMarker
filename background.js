chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
    console.log("request",request)
    if (request.cmd == "fromcontentscript"){
        sendResponse({frompopup: "popup       contetn script   "})
        chrome.tabs.query(
            {active: true, currentWindow: true},
            (tabs) => {
            const tabURL = tabs[0].url
            // const id = tabURL.split('/')
            // const num = tabURL.searchParams.get('no')
            // console.log(tabURL, id, num)
        })
    }
    else {
        sendResponse({frompopup: "    "})
    }
})
