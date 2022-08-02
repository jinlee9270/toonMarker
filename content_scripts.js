let bodyText = document.querySelectorAll('img')
let arr = Array.from(bodyText)

for (let i = 0; i < arr.length ;i++){
    if(arr[i].title !== '참교육'){
        arr[i].style.filter = 'grayscale(100%)'
    }
}
