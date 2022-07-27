let titles = []

document.addEventListener('DOMContentLoaded', function(){
    let btn = document.getElementById("btn")
    btn.addEventListener("click", function(){
        let title = document.getElementById("inputText").value
        titles.push(title)

        ul.innerText = ""

        titles.forEach((toon) => {
            console.log(toon)
            const item = document.createElement('li')
            item.innerText = toon
            ul.appendChild(item)
        })
    });
});