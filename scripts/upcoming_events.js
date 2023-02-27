const cardsContainer = document.querySelector('.cards-container');


function createCard(anArray) {
    let cards = '';
    for (const event of anArray) {
        if( event.date > data.currentDate)
        cards += `
                    <div class="col col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div class="card text-bg-dark" style="width: 16em; height: 25em;">
                            <img src="${event.image}" class="card-img-top" alt="cinema">
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text">${event.description}</p>
                                <div class="row">
                                    <div class="col">
                                        <p>${event.price}</p>
                                    </div>
                                    <div class="col">
                                        <a href="./details.html" class="btn btn-search">See more...</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    `
    }
    return cards ;
    
}


let generateCard = createCard(data.events);

cardsContainer.innerHTML = generateCard ;
