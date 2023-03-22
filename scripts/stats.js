let arrayPast = [];
let arrayUpcoming = [];

    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    // fetch ('./dataApi/amazing.json')
    .then(response => response.json())
    .then(dataApi =>{
        events = dataApi.events
        date = dataApi.currentDate
        arrayPast = pastEvents(events, date)
        arrayUpcoming = futureEvents(events, date)
        console.log(dataApi)
        console.log(events)
        console.log(arrayPast)
        console.log(arrayUpcoming)
        printFirstTable(results(assistance(events), assistance(events).reverse(), capacity(events)), "first-table")
        console.log(assistance(arrayPast))
        printTable(dataApiTable(arrayUpcoming), "upcoming-events")
        printTable(dataApiTable(arrayPast), "past-events")
 
    })
 

    function pastEvents(array, datecurrent){
        return array.filter(event => event.date < datecurrent)
    }

    function futureEvents(array, datecurrent){
        return array.filter(event => event.date > datecurrent)
    }
    

 
    function assistance(arr){
        const arrPercentage = arr.map(event => {
            return {
                attendance: ((event.assistance || event.estimate)/ event.capacity)*100,
                eventTitle: event.name 
            }
        })
        arrPercentage.sort((a, b) => b.attendance - a.attendance)
        console.log(arrPercentage)
        return arrPercentage
    }
    
    function capacity(arr) {
        const arrayCapacity = arr.map(event => {
          return {
            capacity: event.capacity,
            eventTitle: event.name
          }
        })
        arrayCapacity.sort((a, b) => b.capacity - a.capacity)
        console.log(arrayCapacity)
        return arrayCapacity
      
      }

        
      function results(highestPercentage, lowestPercentage, largestCapacity) {
        let all = {
          highestPercentage: highestPercentage[0].eventTitle,
          lowestPercentage: lowestPercentage[0].eventTitle,
          largestCapacity: largestCapacity[0].eventTitle
        }
        return all
      }
      
      function printFirstTable(results, container) {
        const table = document.getElementById(container)
        table.innerHTML = `
        <tr>
            <td>${results.highestPercentage}</td>
            <td>${results.lowestPercentage}</td>
            <td>${results.largestCapacity}</td>
        </tr>
        `
      }

      function dataApiTable(arr) {
        let categories = Array.from(new Set(arr.map(a => a.category)));
        let eventCategories = categories.map(cat => arr.filter(event => event.category == cat))
        let result = eventCategories.map(eventCat => {
          let calculate = eventCat.reduce((acc, event) => {
            console.log(event)
            acc.category = event.category;
            acc.revenues += event.price * (event.assistance || event.estimate);
            acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
            return acc
          }, {
            category: "",
            revenues: 0,
            attendance: 0
          })
          calculate.attendance = calculate.attendance / eventCat.length
          return calculate
        })
        return result;
      }
      

      function printTable(arr, idTag) {
        const upcomingTable = document.getElementById(idTag)
        let html = arr.map(events => {
          return `
            <tr>
                    <td>${events.category}</td>
                    <td>$${events.revenues}</td>
                    <td>${events.attendance.toFixed(2)}%</td>
                </tr>
            `
        })
        upcomingTable.innerHTML = html.join("")
      }
    
