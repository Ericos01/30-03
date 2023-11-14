// MODAL
const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModalBtn = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = () => openModal()
modal.onclick = (event) => {
    if (event.target === modal || event.target === closeModalBtn) closeModal()
}

const scrollHandler = () => {
    if ((window.innerHeight + window.scrollY) > document.body.offsetHeight)
    {
        alert('Hello World')
    }
}

// POST DATA
const formElement = document.querySelector('form')
const postData = () =>{
    form.addEventListener('submit', () => {
        event.preventDefault()

        const request = new XMLHttpRequest()
        request.open("POST","server.php")
        request.setRequestHeader("Center-type", "application/json")
        const formData = new FormData
        const userObject = {}
        formData.forEach((item, index) =>{
            userObject[index] = item
        })
        const jsonUser = JSON.stringify(userObject)
        request.send(jsonUser)
    })
}
postData(formElement)
