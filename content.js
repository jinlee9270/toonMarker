const subItems = () => {
    let bodyText = document.querySelectorAll('li div a img')
    let arr = Array.from(bodyText)
    // console.log("content",arr)
    let database = []
    
    chrome.storage.local.get(null,(item) => {
        // case1. local storage에 data가 없는 경우
        //local storage에 data가 없는 경우는 그냥 만들면 됨
        if (item === null){
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
        // case2. local storage에 data가 있는 경우
        else {

        }
    })
    
    
}

chrome.storage.local.get(null, (item) => {
    let bodyText = document.querySelectorAll('li div a img')
    let arr = Array.from(bodyText)
    Object.entries(item).forEach((element) => {
        Object.entries(element[1]).forEach((el) => {
        // console.log(element[1].preWatch, element[1].title)
            if (el[1].preWatch.length === 0){
                // console.log(el[1].title)
                for(let i = 0;i < arr.length;i++){
                    let title = arr[i].alt
                    if (title === el[1].title){
                        // console.log(title, el[1].title)
                        arr[i].style.filter = "grayscale(100%)"
                    }
                }
            }
        })
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
        // localstoarge에서 titleId 와 일치하는 것을 찾아서 no를 preWatch에 요소로 추가한다
    }

    if (url.href == "https://comic.naver.com/webtoon/weekday"){
        console.log("home")
        subItems()
    }
})

