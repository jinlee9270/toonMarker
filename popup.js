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
            item.setAttribute('class', 'item')
            const itemTitle = document.createElement('div')
            itemTitle.innerText = toon
            
            const editBtn = document.createElement('button')
            editBtn.setAttribute('class', 'editBtn')
            editBtn.onclick = function(){
                //toon을 key로 value를 담아서 input box를 연다
                //해당 input box에 
            }
            editBtn.innerText = "edit"

            const deleteBtn = document.createElement('button')
            deleteBtn.setAttribute('class', 'deleteBtn')
            deleteBtn.onclick = function(){
                // console.log(toon)
                chrome.storage.local.remove(toon)
                // 바뀐 리스트들에 대한 재 랜더링하기    
            }
            deleteBtn.innerText = "delete"
            
            const editBox = document.createElement('div')
            editBox.setAttribute('id', toon+'edit')
            
            const editInput = document.createElement('input')
            editInput.value = toon
            const editSave = document.createElement('button')
            editSave.innerText = 'edit save'

            item.appendChild(itemTitle)
            item.appendChild(editBtn)
            item.appendChild(deleteBtn)
            itembox.appendChild(item)

            editBox.appendChild(editInput)
            editBox.appendChild(editSave)
            itembox.appendChild(editBox)
            document.getElementById(toon+'edit').style.display = 'none'
        })
    })
}

function inputClear(){
    document.getElementById("inputText").value = ""
}

