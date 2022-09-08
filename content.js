const subItems = () => {
    let bodyText = document.querySelectorAll('li div a img')
    let arr = Array.from(bodyText)
    // console.log("content",arr)

    for (let i = 0; i < arr.length; i++){
        let title = arr[i].alt
        const temp = arr[i].currentSrc.split("/")
        let id = temp[5]
        
        if (id && id.length === 6){
            chrome.storage.local.get(id, (item) => {
                if (JSON.stringify(item) === '{}') {
                    chrome.storage.local.set({[id]:{"id":id, "title":title, "preWatch":[]}})
                    chrome.storage.local.get(id,(item)=>{console.log("now in",item)})
                }
            })
        }
    }
}

chrome.runtime.sendMessage({cmd: "getURL"}, (response) => {
    // console.log("getURL");
    // console.log("content",response.frompopup)
    
    const url = new URL(response.frompopup)
    const titleId =  url.searchParams.get('titleId')
    const no = url.searchParams.get('no')
    // console.log("no",no)
    const pathname = url.pathname
    // console.log("pathname",pathname)
    
    // 메인 페이지 접속시에만 작동하게 설정
    if (url === "https://comic.naver.com/webtoon/weekday") {
        chrome.storage.local.get(null, (item) => {
            let bodyText = document.querySelectorAll('li div a img')
            let arr = Array.from(bodyText)
            Object.entries(item).forEach((element) => {
                if (element[1].preWatch.length === 0){
                    // console.log(element[1])
                    for(let i = 0;i < arr.length;i++){
                        let title = arr[i].alt
                        if (title === element[1].title){
                            arr[i].style.filter = "grayscale(100%)"
                        }
                    }
                }
            })
        })
    }

    if (titleId && no && pathname == "/webtoon/detail") {
        const title = document.querySelector('div.detail h2 span.title').innerText
        // console.log('title1',title)
        addPreWatch(titleId, title, no)
    }

    if (url.href == "https://comic.naver.com/webtoon/weekday"){
        // console.log("home")
        subItems()
    }

    else if (url.href.includes("https://comic.naver.com/webtoon/list?titleId=")){
        console.log("list page")
        // 봤던 화수에 대해 색을 다르게 바꾸는 함수 생성
        isWatched(titleId)
    }
})

function addPreWatch (titleId, title, no){
    chrome.storage.local.get(titleId, (target) => {
        Object.entries(target).forEach((item) => {
            // console.log(item)
            if (item[1]) {
                const watchedNumbers = item[1].preWatch
                // console.log(watchedNumbers)
                if (!watchedNumbers.includes(no)) {
                    watchedNumbers.push(no)
    
                    chrome.storage.local.set({[titleId]:{"id":titleId, "title":title, "preWatch": watchedNumbers}})
                    // chrome.storage.local.get(titleId, (test) => {
                    //     console.log("preWatch 확인용",test)
                    // })
                }
            }
            else {
                chrome.storage.local.set({[titleId]:{"id":titleId, "title":title, "preWatch":[no]}})
            }
        })

    })
}

function isWatched(id) {
    chrome.storage.local.get(id, (target) => {
        const pageNode = document.querySelectorAll('tr')
        const pageList = Array.from(pageNode)
        const contentLsit = pageList.slice(2)
        console.log(contentLsit, target)

        Object.entries(target).forEach((keys) => {
            // console.log(keys[1].preWatch)
            const compare1 = keys[1].preWatch
            contentLsit.forEach((temp) => {
                const aaa = temp.querySelector("td a")
                const tempUrl = new URL(aaa.href)
                const num = tempUrl.searchParams.get('no')
                // console.log(tempUrl, num)
                if (compare1.includes(num)) {
                    temp.style.background="#F1EFDC"
                }
            })
        })  
    })
}