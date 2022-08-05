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

function addList() {
    const title = document.getElementById("inputText").value
    console.log('addList')

    chrome.storage.local.get(null, function(titles) {
        let keys = Object.keys(titles)
        console.log('get', keys)

        if (keys.includes(title)) {
            let options = {
                type: "basic",
                title: "already in",
                message: title,
                iconUrl: '/images/8080.webp',
            }
            chrome.notifications.create(options)
            inputClear()
        }
        else if(title == ''){
            let nodata = {
                type: "basic",
                title: "no title",
                message: "input title please",
                iconUrl: '/images/8080.webp',
            }
            chrome.notifications.create(nodata)
        }
        else {
            chrome.storage.local.set({[title]:title})
            ul.innerText = ""
            keys.push(title)
            
            keys.forEach((toon) => {
                const item = document.createElement('li')
                item.innerText = toon
                ul.appendChild(item)
            })
            inputClear()
            chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                chrome.tabs.reload(arrayOfTabs[0].id);
            });
        }
    })
}

window.onload = function(){
    ul.innerText = ""

    chrome.storage.local.get(null, function(titles){
        let keys = Object.keys(titles)
        keys.forEach((toon) => {
            const item = document.createElement('li')
            item.innerText = toon
            ul.appendChild(item)
        })
    })
}

function inputClear(){
    document.getElementById("inputText").value = ""
}