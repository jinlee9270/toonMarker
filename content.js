const dataset = () => {
    let bodyText = document.querySelectorAll('li div a img')
    let arr = Array.from(bodyText)
    // console.log("content",arr)
    let database = []
    for (let i = 0; i < arr.length; i++){
        let title = arr[i].alt
        const temp = arr[i].currentSrc.split("/")
        let id = temp[5]
        if (id !== undefined && id.length === 6){
            if (!database.find(obj => obj.id === id)) {
                database.push({"id":id, "title":title, "preWatch":[]})
                // console.log("database",database)
            }
        }
        chrome.storage.local.set({["database"]:database})
    }
}

chrome.storage.local.get(null, (items) => {
    // console.log("items",items)
    Object.entries(database).forEach((element) => {
        // console.log(element)
        // console.log(element[1].preWatch, element[1].title)
        if (element[1].preWatch.length === 0){
            // console.log(element[1].title)
            for(let i = 0;i < arr.length;i++){
                let title = arr[i].alt
                if (title === element[1].title){
                    // console.log(title, element[1].title)
                    arr[i].style.filter = "grayscale(100%)"
                }
            }
        }
    })
})

chrome.runtime.sendMessage({cmd: "getURL"}, (response) => {
    // console.log("getURL");
    // console.log("content",response.frompopup)
    const url = new URL(response.frompopup)
    const titleId =  url.searchParams.get('titleId')
    const no = url.searchParams.get('no')

    if (titleId && no){
        chrome.storage.local.get(null, (item) => {
            console.log("item",item)
        })
        // titleId 와 일치하는 것을 찾아서 no를 preWatch에 요소로 추가한다
    }

    if (url === "https://comic.naver.com/webtoon/weekday"){
        console.log("home")
    }
})

