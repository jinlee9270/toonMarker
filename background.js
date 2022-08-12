chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        console.log(arrayOfTabs[0].id)
    })
})

//receiving a message
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from  a content script: " + sender.tab.url :
            "from the extension")
        if (request.greeting == 'hello'){
            sendResponse({farewall: "goodbye"})
        }
    }
)