document.getElementById('id_Red').onclick = () => {
    chrome.tabs.query({active: true, currentWindow:true}, (tabs) =>
    {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: setBackGroundColorRed
        });
    });
}

document.getElementById('id_Blue').onclick = () => {
    chrome.tabs.query({active: true, currentWindow:true}, (tabs) =>
    {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: setBackGroundColorBlue
        });
    });
}

function setBackGroundColorRed(){
    document.body.style.backgroundColor = 'red'
}

function setBackGroundColorBlue(){
    document.body.style.backgroundColor = 'blue'
}