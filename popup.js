function pageReload(){
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        chrome.tabs.reload(arrayOfTabs[0].id)
    })
}

const onInit = () => {
    const sidebar = document.getElementById('sublist')
    chrome.storage.local.get(null, (items) => {
        Object.entries(items).forEach((element) => {
            // console.log("element", element[1])
            Object.entries(element[1]).forEach((el) => {
                console.log(el[1].preWatch.length)
                const item = document.createElement('div')
                if (el[1].preWatch.length !== 0){
                    item.setAttribute('class', 'item')

                    const title = document.createElement('div')
                    title.innerText = el[1].title

                    const subBtn = document.createElement('button')
                    subBtn.innertext = "안봄"
                    subBtn.onclick = () => { deleteSub(el[1].id) }

                    item.appendChild(title)
                    item.appendChild(subBtn)

                    sidebar.appendChild(item)
                }
                })
        })
    })
}

onInit()