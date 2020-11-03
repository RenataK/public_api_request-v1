const randomUserUrl = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
let card = document.querySelectorAll('.card');
const body = document.querySelector('body');

//using fetch to fetch the random users
//then parsing the data to json
//finally calling the generateCard function to display data to the page
//(used "Displaying the Content" video to set up this fetch request)
fetch(randomUserUrl) 
    .then(res => res.json())
    .then(data => generateCard(data.results))

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
}


card.addEventListener('click', console.log('Hi'));






