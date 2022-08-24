function pageReload(){
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        chrome.tabs.reload(arrayOfTabs[0].id)
    })
}

function onInit () {
    const sidebar = document.getElementById('sublist')
    chrome.storage.local.get(null, (items) => {
        Object.entries(items).forEach((item) => {
            const itemBox = document.createElement('div')
            console.log("item",item[1].title, item[1].preWatch)

            if (item[1].preWatch.length > 0){
                console.log(item[1].title)
                itemBox.setAttribute('class', 'item')

                const title = document.createElement('div')
                title.setAttribute('class', 'title')
                title.innerText = item[1].title

                const subBtn = document.createElement('button')
                subBtn.setAttribute('class', 'subBtn')
                subBtn.innerText = "not subscribe"
                subBtn.onclick = () => { deleteSub(item[1].id) }

                itemBox.appendChild(title)
                itemBox.appendChild(subBtn)

                sidebar.appendChild(itemBox)
            }
        })
    })
}

onInit()

function deleteSub(id){
    console.log(id)
    chrome.storage.local.get(null, (items) => {
        console.log(items)
        Object.entries(items).forEach((element) => {
            Object.entries(element[1]).forEach((el) => {
                if (el[1].id === id){
                    // console.log(el[1].title)
                    el[1].preWatch = []
                }
            })
        })
    })
    //page reload 관련 집어넣기
}