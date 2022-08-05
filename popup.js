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
    // console.log('addList')

    chrome.storage.local.get(null, function(titles) {
        let keys = Object.keys(titles)
        // console.log('get', keys)

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
            
            onInit()
            inputClear()
            chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                chrome.tabs.reload(arrayOfTabs[0].id);
            });
        }
    })
}

window.onload = function(){
    ul.innerText = ""
    onInit()
}

function onInit(){
    chrome.storage.local.get(null, function(titles){
        let keys = Object.keys(titles)
        // console.log("keys",keys)

        const itembox = document.getElementById('ul')
        // console.log("itembox",itembox)
        keys.forEach((toon) => {
            const item = document.createElement('div')
            const itemTitle = document.createElement('div')
            itemTitle.innerText = toon
            
            const editBtn = document.createElement('button')
            editBtn.innerText = "edit"
    
            const deleteBtn = document.createElement('button')
            deleteBtn.innerText = "delete"
    
            item.appendChild(itemTitle)
            item.appendChild(editBtn)
            item.appendChild(deleteBtn)
            itembox.appendChild(item)
        })
    })
}

function inputClear(){
    document.getElementById("inputText").value = ""
}

