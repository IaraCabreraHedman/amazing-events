const cardsContainer = document.querySelector('.cards-container');
let checkboxes = document.getElementById("checkbox");


  fetch('https://mindhub-xj03.onrender.com/api/amazing')
  // fetch('./data/amazing.json')
  .then(response => response.json())
  .then(dataApi =>{
      console.log(dataApi)
      events = dataApi.events
      console.log(events)
      createCard(events, cardsContainer)
      showCategories(events, checkboxes)
      addChange('input[type="checkbox"]')
      addKey('input[type="search"]')


  })

 //agregar funciones al fetch




function createCard(anArray, container) {
    let cards = '';
    if(anArray.length > 0){
      anArray.forEach((event) =>
      cards += `  <div class="col col-lg-4 col-md-6 col-sm-12 col-xs-12" >   
      <div class="card text-bg-dark" style="width: 16em; height: 28em;">
          <img src="${event.image}" class="card-img-top" alt="">
          <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <div class="row">
                  <div class="col">
                      <p>Price: $${event.price}</p>
                  </div>
                  <div class="col">
                      <a href='./details.html?id=${event._id}' class="btn btn-search" >See more...</a>
                  </div>
              </div>
          </div>
      </div>
  </div>`
  )
   return   container.innerHTML = cards

    }         
   else if (anArray.length == 0) {
    return "<p>We didn't found this category. Try something else.</p>"
   }
    
}




//Checkbox

//Mostrar




function showCategories(anArray, container) {
  let checkboxes = [];
  anArray.forEach((event) => {
    if (checkboxes.indexOf(event.category) < 0) {
      checkboxes.push(event.category);
    }
  })
  let categories = "";
  checkboxes.forEach((category) => 
        categories += `
      <div class="form-check form-switch">
        <label class="text-light me-2 label" for="checkbox">
          <input class="check-input" type="checkbox" role="switch" id="${category}" value="${category}" >
                        ${category}
        </label>
      </div>                `)
        
  return container.innerHTML = categories;
}

// //Filtrar


function addChange(container){
  let categoryCheck = document.querySelectorAll(container);
  categoryCheck.forEach((category)=>category.addEventListener('change', filterCheck))
  console.log(categoryCheck)
}






function filterCheck(e) {
  console.log(e)
  let categoryCheck = document.querySelectorAll('input[type="checkbox"]')
  let selectedCheck = Array.from(categoryCheck).filter((item) => item.checked).map((item) => item.value)
  let filtered = events.filter(event => selectedCheck.includes(event.category))
  console.log(filtered)
  if(selectedCheck.length > 0){
    return createCard(filtered, cardsContainer)
  }
  else{
 return  createCard(events, cardsContainer)
  }
 
}


// //Busqueda

function addKey(container){

  let search = document.querySelector(container);
  search.addEventListener("keyup",filterSearch)
  console.log(search)
}


function filterSearch(e) {
  console.log(e)
let input = document.querySelector('input[type="search"]')
let keyword = input.value.toLowerCase();
let filteredString = events.filter(event => event.category.toLocaleLowerCase().startsWith(keyword) );
console.log(filteredString);
 return  createCard(filteredString, cardsContainer)
}




