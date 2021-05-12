const moment = require('moment');

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
            return (`<div id="mini-col-${el}"  class="col half-coll text-center d-flex flex-wrap justify-content-center p-2" ><div style='height: 27px'><p  id=mini-date-${el} class='d-flex align-self-center'>${el}</p></div><div class=' col-12 d-flex justify-content-start align-items-center text-center'><div class="col-10 d-flex flex-wrap text-center"'><span id='event-${el}' class='mb-4' style="max-height: 10px;"><!--INSERT EVENT ICONS HERE --></span></div></div></div>`)
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

