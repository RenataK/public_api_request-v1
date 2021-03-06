const randomUserUrl = 'https://randomuser.me/api/?nat=us&results=12';
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const header = document.querySelector('header h1').style.color = '#eee';
const body = document.querySelector('body').style.background = '#111d4a';
let employeeData = [];
const employeeCard = document.getElementsByClassName('card');

/**
 * created loadEmployees variable using async/await where:
 * url is fetched
 * respose is parsed to json
 * the data.results is passed to generateCard function 
 * that is then pushed to employeeData
 * Modal popout and searchBar functions run
 * using try and catch to test errors and display them to console.
 */
const loadEmployees = async () => {
    try {
        const res = await fetch(randomUserUrl) 
        const data = await res.json();
            generateCard(data.results);
            employeeData.push(...data.results);
            createModalPopout();
            searchBar();
    } 
    catch (err) {
        console.error(err);
    }
}
/**
 * Created the search bar feature using the given markup
 * and appending it to the page. 
 * Added an event listener for keyup, looped thru the employee
 * cards to make sure the textContent in the h3 div matches
 * the search string and hid/displayed the appropriate card. 
 */
function searchBar() {
    const search = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
    searchContainer.insertAdjacentHTML('beforeend', search);

    const searchBar = document.getElementById('search-input');
    searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
        for (let i=0; i<employeeCard.length; i++) {
            if (
            employeeCard[i].querySelector('h3').textContent.toLowerCase().includes(searchString) ) {
                employeeCard[i].style.display = '';
            } else {
                employeeCard[i].style.display = 'none';
            }
         }
    });
}

/** creating the generateCards function 
looping thru the results of the people generated
using placeholders to retrieve data with the given results
helpful links: “Handle Multiple Promises with Promise.all”, doggoselect workspace
**/
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
        gallery.insertAdjacentHTML('beforeend', getCards);
}

/** looping around the cards and attaching a click listener to each,
checking the events composed path that includes the cards clicked to make sure 
you're able to click anywhere on the card and generate the modal. 
**/
function createModalPopout() {
    let card = document.querySelectorAll('.card');
    for (let i=0; i<card.length; i++) {
        card[i].addEventListener('click', (e) => {
           let index = [...card].indexOf(e.currentTarget);
                generateModal(employeeData[index]);
        });
    }
}

/** creating the generateModal function 
used placeholders to retrieve person data.
Attached an event listener to close button to exit the modal. 
**/
function generateModal(person) { 
    const modalContainer =  `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${person.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="modal-text">${person.email}</p>
            <p class="modal-text cap">${person.location.city}</p>
            <hr>
            <p class="modal-text">${person.cell.slice(0, 5)} ${person.cell.slice(6, 14)}</p>
            <p class="modal-text">${person.location.street.number} ${person.location.street.name} 
            ${person.location.city}, ${person.location.state}
            ${person.location.postcode}</p>
            <p class="modal-text">Birthday: ${person.dob.date.slice(5, 7)}/${person.dob.date.slice(8, 10)}/${person.dob.date.slice(2, 4)}</p>
        </div>
    </div>
    `;

        document.body.insertAdjacentHTML('beforeend', modalContainer);

        const button = document.getElementById('modal-close-btn');
        const modal = document.querySelector('.modal-container');

        button.addEventListener('click', () => {
        modal.remove();
    });
}

loadEmployees();
