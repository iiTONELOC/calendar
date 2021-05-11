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
            return (`<div id="mini-col-${el}" class="col half-coll text-center p-2"><p id=mini-date-${el}>${el}<br><span id='reminder-${el}'> </span></p></div>`)
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
        return data.map(el=>{
            return el.day
        }).join(" ")
    }

}

