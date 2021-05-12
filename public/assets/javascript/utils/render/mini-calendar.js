// get current day 
const day = moment(new Date()).format('D');
const currentDayEl = document.getElementById(`mini-date-${day}`);

// set background color for current day
currentDayEl.setAttribute('class', 'mini-current-date d-flex align-self-center text-center')


