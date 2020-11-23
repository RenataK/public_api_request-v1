const randomUserUrl = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

//using fetch to fetch the random users
//then parsing the data to json
//finally calling the generateCard function to display data to the page
//(used "Displaying the Content" video to set up this fetch request)
fetch(randomUserUrl) 
    .then(res => res.json())
    .then(data => generateCard(data.results))
    .then(() => createModalPopout())
    //.then( () => generateModal())

//creating the generateCards function 
//looping thru the results of the people generated
//using placeholders to retrieve data with the given results
//helpful links: “Handle Multiple Promises with Promise.all”, doggoselect workspace
function generateCard(data) {
    const getCards = data.map(results => { return `
        <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${results.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${results.name.first} ${results.name.last}</h3>
                    <p class="card-text">${results.email}</p>
                    <p class="card-text cap">${results.location.city}, ${results.location.state}</p>
                </div>
            </div>
        `}).join('');
        gallery.innerHTML = getCards;
        //gallery.insertAdjacentHTML('beforeend', getCards);
}

function createModalPopout() {
    gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV' && e.target !== gallery) {
        console.log(e.target);
        generateModal();
    }
});
}

function generateModal() { 
    const modalConatiner = person => { return `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${person.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="modal-text">${person.email}</p>
            <p class="modal-text cap">${person.location.city}</p>
            <hr>
            <p class="modal-text">${person.phone}</p>
            <p class="modal-text">${person.location.street.number} ${person.location.street.name} 
            ${person.location.city}, ${person.location.state}
            ${person.location.postcode}</p>
            <p class="modal-text">Birthday: ${person.dob.date}</p>
        </div>
    </div>
    `;
}
        document.body.insertAdjacentHTML('beforeend', modalConatiner);

        const button = document.getElementById('modal-close-btn');
        const modal = document.querySelector('.modal-container');

        button.addEventListener('click', () => {
        modal.remove();
    });
}
