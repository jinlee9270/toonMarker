let bodyText = document.querySelectorAll('a')
let arr = Array.from(bodyText)
// console.log(bodyText)
// console.log(arr)
for (let i = 0; i < arr.length ;i++){
    // console.log(arr[i].innerText)
    if(arr[i].innerText === '참교육'){
        console.log(arr[i].style.color)
        arr[i].style.color = '#ff0000'
        console.log("여기있다")
        console.log(arr[i].style.color)
    }
}
