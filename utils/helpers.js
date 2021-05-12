const moment = require('moment');
const renderEventIcons = require('./mini-events');
module.exports = {
    // format_date: date => {
    //     return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
    //         date
    //     ).getFullYear()}`;
    // },
    // format_plural: (word, amount) => {
    //     if (amount !== 1) {
    //         return `${word}s`;
    //     }

    //     return word;
    // },

    render_mini_1: data => {
        if (data === undefined) {
            return '';
        }
        const dates = data.map(el => {
            if (el === 0) {
                el = "";
            }
            // MAKE A FUNCTION THAT CHECKS FOR REMINDERS AND ADD IN SPAN
            return (`<div id="mini-col-${el}" class="col half-coll text-center p-2"><div class='d-flex column-wrap justify-content-start align-items-center'><p id=mini-date-${el}>${el}</p><br><span class='my-2 d-flex flex-wrap justify-content-center text-center'><span ${renderEventIcons(el)}</span></span></div> </div>`)
        }).join(" ")
        return dates
    },

    display_date: () => {
       return moment(new Date()).format('dddd [the] Do [of] MMMM');
    },

    render_week_days: () =>{
        const days = [
            "S",
            "M",
            "T",
            "W",
            "Th",
            "F",
            "S"
        ]
        const weekDays = days.map(el=>{
            return (`<div id="mini-col-${el}" class="col half-coll"><p id=${el}>${el}</p></div>`)
        }).join(" ")

        return weekDays
    },

    render_events: (data) =>{
        // ADDs LIST OF EVENTS TO MONTH TITLE ON MINI CALENDAR
        if(data === undefined){
            // INSTEAD OF RETURNING EMPTY TRY TO FETCH CALENDAR AGAIN
            return ''
        }
        return data.map(el=>{
            return el.day
        }).join(" ")
    }

}

