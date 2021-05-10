// get current day 
const day = moment(new Date()).format('D');
const currentDayEl = document.getElementById(`mini-date-${day}`);

// set background color for current day
currentDayEl.setAttribute('class', 'mini-current-date')

// get list of days with events
const eventData = document.querySelector(".mini-month").getAttribute('data-events');
let eventArray = eventData.split(" ")
for (let i = 0; i < eventArray.length; i++) {
    const element = eventArray[i];
    document.getElementById(`mini-date-${element}`).setAttribute('class', 'current-event')
}

