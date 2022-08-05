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
            console.log(preview)
            let options = {
                type: "basic",
                title: '이미 있는 제목',
                message: title,
                iconUrl: '/images/8080.webp',
            }
            chrome.notifications.create(options)
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