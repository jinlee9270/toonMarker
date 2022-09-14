const makeItem = () => {
    let imgNode = document.querySelectorAll('li div a img')
    let imgList = Array.from(imgNode)

    for (let i = 0; i < imgList.length; i++){
        const title = imgList[i].alt
        // console.log("imgList",title)
        const temp = imgList[i].currentSrc.split("/")
        let id = temp[5]
        // console.log(id)
        
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
    
    const url = new URL(response.frompopup)
    const urlHref = url.href
    const titleId =  url.searchParams.get('titleId')
    const no = url.searchParams.get('no')
    const pathname = url.pathname

    // 메인 페이지 접속시에만 작동하게 설정
    // url parsing 에서 id 추출방법은 맞지 않아서 split 하는 방법으로 구현
    if (urlHref === "https://comic.naver.com/webtoon/weekday") {
        chrome.storage.local.get(null, (subObjs) => {
            let imgNodes = document.querySelectorAll('li div a img')
            let imgList = Array.from(imgNodes)
            Object.entries(subObjs).forEach((subObj) => {
                if (subObj[1].preWatch.length === 0){
                    for(let i = 0;i < imgList.length;i++){
                        let title = imgList[i].alt
                        if (title === subObj[1].title){
                            imgList[i].style.filter = "grayscale(100%)"
                        }
                    }
                }
            })
        })
    }

    if (titleId && no && pathname == "/webtoon/detail") {
        const title = document.querySelector('div.detail h2 span.title').innerText
        addPreEpi(titleId, title, no)
    }

    if (url.href == "https://comic.naver.com/webtoon/weekday") {
        makeItem()
    }

    else if (url.href.includes("https://comic.naver.com/webtoon/list?titleId=")) {
        console.log("list page")
        // 봤던 화수에 대해 색을 다르게 바꾸는 함수 호출
        isWatched(titleId)
    }
})

// addPreWatch 함수이름 변경할 것 isWatched과 비슷하게 일치시킬 것
// target, item, watchedNumbers도 명확한 의미로 변경할 것
function addPreEpi (titleId, title, episode){
    chrome.storage.local.get(titleId, (titleIdObjs) => {
        Object.entries(titleIdObjs).forEach((titleIdObj) => {
            if (titleIdObj[1]) {
                const watchedEpi = titleIdObj[1].preWatch
                if (!watchedEpi.includes(episode)) {
                    watchedEpi.push(episode)
                    chrome.storage.local.set({[titleId]:{"id":titleId, "title":title, "preWatch": watchedEpi}})
                    // chrome.storage.local.get(titleId, (test) => {
                    //     console.log("preWatch 확인용",test)
                    // })
                }
            }
            else {
                chrome.storage.local.set({[titleId]:{"id":titleId, "title":title, "preWatch":[episode]}})
            }
        })

    })
}

// function 이름 수정 is~~ 라는 이름은 boolen type 에 적합
// target, pageNode, pageList, compare1, aaa 등 변수 이름 명확하게 변경할 것
function isWatched(id) {
    chrome.storage.local.get(id, (target) => {
        const pageNode = document.querySelectorAll('tr')
        const pageList = Array.from(pageNode)
        //slice 바꾸기 - 완결웹툰 같은 경우는 1개만 잘라야 하는 경우가 있음 url 추출로 변경할 것
        const contentLsit = pageList.slice(2)
        console.log(contentLsit, target)

        Object.entries(target).forEach((keys) => {
            const compare1 = keys[1].preWatch
            contentLsit.forEach((temp) => {
                const aaa = temp.querySelector("td a")
                const tempUrl = new URL(aaa.href)
                const num = tempUrl.searchParams.get('no')
                if (compare1.includes(num)) {
                    temp.style.background="#F1EFDC"
                }
            })
        })  
    })
}