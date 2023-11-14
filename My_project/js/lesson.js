// PHONE CHECKER VALIDATOR

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'ERROR'
        phoneResult.style.color = 'red'
    }
})

// TAB SLIDER

const tabContentBLocks = document.querySelectorAll('.tab_content_block')
const tabsItems = document.querySelectorAll('.tab_content_item')
const parentTabs = document.querySelector('.tab_content_items')
const hideTabContent = () =>{
    tabContentBLocks.forEach((tabContentBlock) =>{
        tabContentBlock.style.display = 'none'
    })
    tabsItems.forEach((tabItem)=>{
        tabItem.classList.remove('tab_content_item_active')    })
}
const showTabContent = (indexElement = 0) =>{
    tabContentBLocks[indexElement].style.display = 'block'
    tabsItems[indexElement].classList.add('tab_content_item_active')
}
parentTabs.onclick = (event) =>{
    if(event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem,tabIndex) =>{
        if(event.target === tabItem){
            hideTabContent()
            showTabContent(tabIndex)
        }
    })
}
}
const autoTabContentSlide = (i = 0) => {
    setInterval(() => { i++
        if (i > tabContentBLocks.length - 1) {
            i = 0
        }
        hideTabContent()
        showTabContent(i)    }, 3000)
}
autoTabContentSlide()
hideTabContent()
showTabContent()

const dalcInput = document.querySelector('#dalc')
const pentoInput = document.querySelector('#pento')
const yenInput = document.querySelector('#yen')
const usdInput = document.querySelector('#usd')

const convertorChanges = (elementValue,targetElementPento, targetElementYen,targetElementUsd,itsTrue) => {
    elementValue.oninput = () => {
        const request = new XMLHttpRequest()
        request.open("GET", "../data/converter.json")
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () => {
            const response = JSON.parse(request.response)
            if (itsTrue === "dalc"){
                targetElementPento.value = (elementValue.value / response.pento).toFixed(2)
                targetElementYen.value = (elementValue.value / response.yen).toFixed(2)
                targetElementUsd.value = (elementValue.value / response.usd).toFixed(2)
            }else if (itsTrue === 'pento'){
                targetElementPento.value = (elementValue.value * response.pento).toFixed(2)
                targetElementYen.value = (elementValue.value * (response.pento / response.yen)).toFixed(2)
                targetElementUsd.value = (elementValue.value * (response.pento / response.usd)).toFixed(2)
            }else if(itsTrue ==='yen'){
                targetElementYen.value = (elementValue.value * response.yen).toFixed(2)
                targetElementPento.value = (elementValue.value * (response.yen / response.pento)).toFixed(2)
                targetElementUsd.value = (elementValue.value * (response.yen / response.usd)).toFixed(2)
            }else{
                targetElementUsd.value = (elementValue.value * response.usd).toFixed(2)
                targetElementPento.value = (elementValue.value * (response.usd / response.pento)).toFixed(2)
                targetElementYen.value = (elementValue.value * (response.usd / response.yen)).toFixed(2)
            }
            if (elementValue.value === '') {
                targetElementUsd.value = ''
                targetElementYen.value = ''
                targetElementPento.value = ''
            }
        }
    }
}

convertorChanges(dalcInput, pentoInput, yenInput,usdInput,'dalc')
convertorChanges(pentoInput, dalcInput, yenInput,usdInput,'pento')
convertorChanges(yenInput,pentoInput,dalcInput, usdInput,'yen')
convertorChanges(usdInput,pentoInput,yenInput,dalcInput, 'usd')

//CARD SWITCHER

    const card = document.querySelector('.card')
    const btnPrev = document.querySelector('#btn-prev')
    const btnNext = document.querySelector('#btn-next')
    let id = 1
    const getTodos = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            const data = await response.json()
            card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>`
        } catch (error) {
            console.log(error)
        }
    }
    getTodos()
    btnPrev.onclick = () => {
        id < 1 ? id = 200 : id--
        getTodos()
    }


    btnNext.onclick = () => {
        id > 200 ? id = 1 : id++
        getTodos()
    }
//WEATHER

    const cityNameInput = document.querySelector('.cityName')
    const city = document.querySelector('.city')
    const temp = document.querySelector('.temp')
    const btnSearch = document.querySelector('#search-btn')
    const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
    const citySearch = () => {
        btnSearch.onclick = () => {
            fetch(`${BASE_URL}?q=${cityNameInput.value}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    city.innerHTML = data.name
                    temp.innerHTML = Math.round(data.main.temp - 273) + '&deg'
                })
        }
    }
citySearch()