let bodyText = document.querySelectorAll('img')
let arr = Array.from(bodyText)

chrome.storage.local.get(null, function(items){
    const mykey = Object.keys(items)
    console.log("mykey",mykey)
    console.log('arr', arr)
    for (let i = 0; i < arr.length ;i++){
        if(!mykey.includes(arr[i].title)){
            console.log("arr[i]",arr[i])
            arr[i].style.filter = 'grayscale(100%)'
        }
    }
})

// for (let i = 0; i < arr.length ;i++){
//     if(mylist.includes(arr[i])){
//         arr[i].style.filter = 'grayscale(100%)'
//     }
// }

// chrome.runtime.sendMessage({greeting: 'hello'}, function(response){
//     console.log(response.farewell)
// }) 