
console.log('App Js data');
// const fetch = require('node-fetch');


//Fetch is the api of code js to get the js and it call then() in which we can call a callback method
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch('https://dummyjson.com/products/1')
// .then((res) => res.json().then(json => {
//     console.log(json)
// }))

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = searchInput.value;

    messageOne.textContent = "fetching weather...";
    messageTwo.textContent = "";

    fetch('http://localhost:3000/weather?address='+location)
    .then((res) => res.json().then(jsonData => {
    if(jsonData.error)
    {
        console.log(jsonData.error)
        messageOne.textContent = jsonData.error;

    }else{
        console.log(jsonData)
        messageOne.textContent = jsonData.place;
        messageTwo.textContent = jsonData.forecast;

    }
}))
})

