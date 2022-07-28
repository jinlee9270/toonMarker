let titles = []

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
        if (titles.includes(title)) {
            let options = {
                type: "basic",
                title: "already noted",
                message: '',
                iconUrl: '/images/8080.webp'
            }
            chrome.notifications.create(options)
        }
        else {
        titles.push(title)

        ul.innerText = ""
        
        titles.forEach((toon) => {
            console.log(toon)
            const item = document.createElement('li')
            item.innerText = toon
            ul.appendChild(item)

        })
    }
}