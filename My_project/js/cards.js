
async function getPosts(){
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        console.log(response)
        let data = await response.json();
        console.log(data);
        let display = ''
        data.map((values)=>{
            display += `
        <div class="card">
            <img src='../img/thumbbig-1337478.webp'>           
            <h2 class="card_title">${values.title}</h2>        
            <p class="card_desc">${values.body}</p>
        </div>`
        });
        document.querySelector('.content').innerHTML = display;
    }catch (error){
        console.error('Something is not okay...')    }
}
getPosts()
