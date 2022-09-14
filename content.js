const makeItem = () => {
    let imgNode = document.querySelectorAll('li div a img')
    let imgList = Array.from(imgNode)

    // url parsing 에서 id 추출방법은 맞지 않아서 split 하는 방법으로 구현
    for (let i = 0; i < imgList.length; i++){
        const title = imgList[i].alt
        const temp = imgList[i].currentSrc.split("/")
        let id = temp[5]
        
        if (id && id.length === 6){
            chrome.storage.local.get(id, (item) => {
                if (JSON.stringify(item) === '{}') {
                    chrome.storage.local.set({[id]:{"id":id, "title":title, "preWatch":[]}})
                    // chrome.storage.local.get(id,(item)=>{console.log("now in",item)})
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
        coloringEpi(titleId)
    }
})

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

function coloringEpi(id) {
    chrome.storage.local.get(id, (target) => {
        const epiNodes = document.querySelectorAll('tr')
        const epiLists = Array.from(epiNodes)
        Object.entries(target).forEach((titleId) => {
            epiLists.forEach((episode) => {
                const epiLink = episode.querySelector("td a")
                if (epiLink) {
                    const tempUrl = new URL(epiLink.href)
                    const epiNum = tempUrl.searchParams.get('no')
                    if (titleId[1].preWatch.includes(epiNum)) {
                        episode.style.background="#F1EFDC"
                    }
                }
            })
        })  
    })
}