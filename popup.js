// tabId 부분 에러
// chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//     let tab = tabs[0].url
//     chrome.scripting.executeScript({
//         target: {tabId: tab},
//         file: 'content_scripts.js'
//     })
// });

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
        let flag = false
        let keys = Object.keys(titles)
        console.log('get', keys)
        for (let i = 0 ;i < keys.length; i++) {
        
            if (title === keys[i]) {
                console.log('1')

                let options = {
                    type: "basic",
                    title: '이미 있는 제목',
                    message: title,
                    iconUrl: '/images/8080.webp'
                }
                
                flag = true
                chrome.notifications.create(options)
            }
        }

        if (!flag) {
            chrome.storage.local.set({[title]:title})
            console.log('!flag', keys)
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
