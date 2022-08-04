chrome.runtime.onInstalled.addListener(() => {
    //logging the console
    console.log("This is coming from the background script!")
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