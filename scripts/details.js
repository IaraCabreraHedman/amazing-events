
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    // fetch('./data/amazing.json')
    .then(response => response.json())
    .then(dataApi =>{
        console.log(dataApi)
        events = dataApi.events
        console.log(events)
        const queryString =  location.search;
        const params = new URLSearchParams(queryString);
        const eventId = params.get("id");
        getEvent("#detail-container", events, eventId)
 
    })
    // .catch(error => console.log(error.message))

    


function getEvent(container, array, id){
    const detailsContainer = document.querySelector(container) 
    let eventDetail = array.find(event => event._id == id)
 return   detailsContainer.innerHTML = `<div class="col-lg-6">
                                            <div class="card ">
                                                <div class="row g-0">
                                                    <div class="col-6 col-md-5">
                                                    <img src="${eventDetail.image}" class="card-image img-fluid details-image" alt=""/>
                                                    </div>
                                                    <div class="col-6 col-md-7 card-body">
                                                    <div class=" d-flex flex-column">
                                                        <div class="h-100">
                                                        <h3 class="card-title">${eventDetail.name}</h3>
                                                        <p class="card-text">Place: ${eventDetail.place}</p>
                                                        <p class="card-text">Capacity:${eventDetail.capacity}</p>
                                                        <p class="card-text">Assistance:${eventDetail.assistance || eventDetail.estimate}</p>
                                                        <p class="card-text">Date:${eventDetail.date}</p>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`

}

