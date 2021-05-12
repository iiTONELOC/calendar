


// wait for dom to load
function ready(callbackFunction) {
    if (document.readyState != 'loading')
        callbackFunction()

    else
        document.addEventListener("DOMContentLoaded", callbackFunction)
    return
}
ready(() => {
    fetch('https://my-caltasker.herokuapp.com/api/events/reminders', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        return res.json()
    }).then(response => {
        const events = response
        console.log(events)
        
        
        
      
        // loop through events for the day, grab the category name
        // for each event, add a . into reserved spot and set the 
        // span's class for correct color
        for (let i = 0; i < events.length; i++) {
            const p = document.createElement('span')
            const currentDay = events[i].day;
            const catName = events[i].category.name;
            const eventSpanEl = document.getElementById(`event-${currentDay}`)
            // CREATE A NEW SPAN TO PLACE . IN
            p.setAttribute('class',`${catName}  text-start align-self-start '`);
            p.textContent = '.'
            eventSpanEl.appendChild(p);
            // eventSpanEl.appendChild(span);
        }

    }).catch(e => {
        console.log(e)
        return
    })

})








