chrome.runtime.onInstalled.addListener(
    //logging the console
    console.log("This is coming from the background script!"),

    //creating a context menu
    chrome.contextMenus.create({
        id: "test",
        title: "Hey, this is a test context menu",
        type: "normal",
        contexts: ["selection"]
    })
)
