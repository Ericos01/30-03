// JSON
const obj = {
    name: 'Nurdin',
    age: 19

}
//console.log(JSON)
//console.log(obj)
//const data = JSON.stringify(obj)
//console.log(data)
//const newObject = JSON.parse(data)
//console.log(newObject)
// XML Http Request
const getButton = document.querySelector('btn')

getButton.onclick = () => {
    const request = new XMLHttpRequest() // 1
    request.open("GET", "data.json") //2
    request.setRequestHeader("Content-type", "application/json") //3
    request.send() //4
}
    request.onload = () => {
        const data = JSON.parse(request.response)
        document.querySelector('.name').innerHTML = data.name
        document.querySelector('.age').innerHTML = data.age
}


