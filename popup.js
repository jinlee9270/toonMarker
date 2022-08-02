let titles = []

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    let tab = tabs[0].url
    chrome.scripting.executeScript({
        target: {tabId: tab},
        file: 'content_scripts.js'
    })
});

document.addEventListener('DOMContentLoaded', function(){
    let btn = document.getElementById("btn")
    let inputText = document.getElementById("inputText")
    btn.addEventListener("click", addList)
    inputText.addEventListener("keyup", function(e) {
        if (e.key == 'Enter'){
            addList()
        }
    })

});

function addList(){
    let title = document.getElementById("inputText").value
    chrome.storage.local.set({ title }, function(){
        console.log(title)
        chrome.storage.local.get("title", function (value) {
            console.log(value);
        });
    })
        // if (titles.includes(title)) {
        //     let options = {
        //         type: "basic",
        //         title: '이미 있는 제목',
        //         message: title,
        //         iconUrl: '/images/8080.webp'
        //     }
        //     chrome.notifications.create(options)
        // }
        // else {
        //     titles.push(title)
        //     ul.innerText = ""
            
        //     titles.forEach((toon) => {
        //         const item = document.createElement('li')
        //         item.innerText = toon
        //         ul.appendChild(item)
        //     })
        // }
}



