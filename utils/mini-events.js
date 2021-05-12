
const Reminders = require('../models/Reminders');
const CalRender = require('./render-calendar');
// search for all reminders from user for selected day.

// id='reminder-${el}'>
const renderEventIcons = (el) => {
    let event_id = 1
    let event_cat = 1
    // get current day 
 
    // get list of days with events returned from dashboard routes
    // const eventData = document.querySelector(".mini-month").getAttribute('data-events');
    // let eventArray = eventData.split(" ")

    // if (eventArray.length >= 1) {
    //     for (let i = 0; i < eventArray.length; i++) {
    //         const element = eventArray[i];
    //         if (element === 0 || element === ' ' || element === null || element === undefined || element === '') {
    //             break
    //         }
    //         // SETTING THE BACKGROUND FOR EACH DAY WITH 
    //         document.getElementById(`mini-date-${element}`).setAttribute('class', 'current-event')
    //     }
    // }
    return `id='event-${event_id}' class='event-${event_cat} text-start mt-1'>...`;
};

module.exports = renderEventIcons;

