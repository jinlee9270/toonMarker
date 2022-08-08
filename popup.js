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
            editBtn.setAttribute('id', toon+'editBtn')
            editBtn.onclick = () => {showEdit(toon+'edit')}
            editBtn.innerText = "edit"

            const deleteBtn = document.createElement('button')
            deleteBtn.setAttribute('class', 'deleteBtn')
            deleteBtn.onclick = function(){
                chrome.storage.local.remove(toon)
                //재 린더링 해야 하는데
            }
            deleteBtn.innerText = "delete"
            
            const editBox = document.createElement('div')
            editBox.setAttribute('class', "editBox")
            editBox.setAttribute('id', toon+'edit')
            
            const editInput = document.createElement('input')
            editInput.setAttribute('id', toon+'editInput')
            editInput.value = toon

            const editSaveBtn = document.createElement('button')
            editSaveBtn.innerText = 'edit save'
            // editSaveBtn.setAttribute('onclick', saveEdit)
            // editSaveBtn.onclick = () => {saveEdit(toon)}
            
            item.appendChild(itemTitle)
            item.appendChild(editBtn)
            item.appendChild(deleteBtn)
            itembox.appendChild(item)

            editBox.appendChild(editInput)
            editBox.appendChild(editSaveBtn)
            itembox.appendChild(editBox)
            
            document.getElementById(toon+'edit').style.display = 'none'
        })
    })
}

function inputClear(){
    document.getElementById("inputText").value = ""
}

function showEdit(toon){
    console.log(toon, document.getElementById(toon).style)
    if (document.getElementById(toon).style.display === "block"){
        document.getElementById(toon).style.display = "none"
    }
    else{
        document.getElementById(toon).style.display = "block"
    }
}

// function saveEdit(target) {
//     // 기존 key값을 현재 key 값으로 바꾸고 value도 현재 value로 바꾼다
//     chrome.storage.local.get(target, function(target){
//         // chrome.storage.local.remove(target)
//         const newTitle = document.getElementById(target+"editInput").value
//         chrome.storage.local.set({[newTitle]:newTitle})
//     })
// }