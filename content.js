let bodyText = document.querySelectorAll('li div a img')
let arr = Array.from(bodyText)

console.log("content",arr)

for (let i = 0; i <arr.length;i++){
    let title = arr[i].alt
    const temp = arr[i].currentSrc.split("/")
    let titleId = temp[5]
    
    console.log(arr[i].alt)
    console.log(temp[5])
}
// chrome.storage.local.get(null, function(items){
//     const mykey = Object.keys(items)
//     // console.log("mykey",mykey)
//     // console.log('arr', arr)
//     for (let i = 0; i < arr.length ;i++){
//         if(!mykey.includes(arr[i].title)){
//             // console.log("arr[i]",arr[i])
//             arr[i].style.filter = 'grayscale(100%)'
//         }
//     }
// })

// chrome.runtime.sendMessage({greeting: 'backgroundhello'}, (response) => {
//     console.log("[contentscript] chrome.runtime.sendMessage()")
//     console.log(response.farewell)
// })
