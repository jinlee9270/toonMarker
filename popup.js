let titles = []
document.addEventListener('DOMContentLoaded', function(){
    let btn = document.getElementById("btn")
    btn.addEventListener("click", function(){
        let title = document.getElementById("inputText").value
        titles.push(title)
        // console.log(titles)
    });
});