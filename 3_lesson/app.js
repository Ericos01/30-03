//console.log('Hello')
// DOM - document object model
//console.log(window)
//console.log(document);
//const button = document.querySelector('.btn')
//const arr = [1, 2, 3]
//console.log(button)
//const btn1 = document.getElementById('btn1')
// ES5
//const btns = document.getElementsByClassName('btn')
//console.dir(btn2)
//console.log(btns)
// ES6
//const buttons = document.querySelector('.btn')
//const btn = document.querySelector('#btn3')
//console.log(btn)
//const btns = document.querySelectorAll('.btn')
//const btns = document.querySelectorAll('.button')
//console.log(btns)
//Делигирование событий
//const wrapper = document.querySelector('.btn-block')
//const buttons = document.querySelectorAll('button')
//console.log(buttons[0])
//buttons[1].style.background = 'red'
//console.log(buttons[0].classList);
//buttons[0].classList.add('red')
//buttons[0].classList.remove('red')
//const wrapper = document.querySelector('.btn-block')
//const buttons = document.querySelectorAll('button')
//buttons.forEach((button) =>{
//    button.addEventListener('click',(event) => {
//        if (event.target.classList.contains('red')) {
//            event.target.classList.remove('red')
//        }else{
//            event.target.classList.add('red')
//        }
//    })
//})
//const newButton = document.createElement('button')
//wrapper.append(newButton)

// Делигирование событий
const wrapper = document.querySelector('.btn-block')
const buttons = document.querySelectorAll('button')
wrapper.onclick = (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
        event.target.onclick = (e) => {
            if (e.target.classList.contains('red')) {
                e.target.classList.remove('red')
            }else {
                e.target.classList.add('red')
            }
        }
    }
}
const newButton = document.createElement('button')
wrapper.append(newButton)