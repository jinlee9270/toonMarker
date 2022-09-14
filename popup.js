function pageReload(){
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        chrome.tabs.reload(arrayOfTabs[0].id)
    })
}

function makeSubList () {
    document.getElementById('sublist').innerText = ''
    const sidebar = document.getElementById('sublist')
    
    chrome.storage.local.get(null, (subItems) => {
        Object.entries(subItems).forEach((subItem) => {
            const itemBox = document.createElement('div')

            if (subItem[1].preWatch.length > 0){
                itemBox.setAttribute('class', 'item')

                const title = document.createElement('div')
                title.setAttribute('class', 'title')
                title.innerText = subItem[1].title

                const subBtn = document.createElement('button')
                subBtn.setAttribute('class', 'subBtn')
                subBtn.innerText = "not subscribe"
                subBtn.onclick = () => { deleteSub(subItem[1].id, subItem[1].title) }

                itemBox.appendChild(title)
                itemBox.appendChild(subBtn)

                sidebar.appendChild(itemBox)
            }
        })
    })
}

makeSubList()

function deleteSub(id, title){
    chrome.storage.local.get(id, () => {
        chrome.storage.local.set({[id]:{"id":id, "title":title, "preWatch":[]}})
    
        pageReload()
        makeSubList()
    })
}