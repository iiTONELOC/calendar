const calendar = require('node-calendar');

class CalRender {
    // function to return month
    // year is 4 digit
    // month is single digit ex 1-9 10-12
    static createCalMonth(year, month)  {
        return new calendar.Calendar(1).monthdayscalendar(year, month)
    }
}

// const may = CalRender.createCalMonth(2021, 05);

// console.log(may)

module.exports = CalRender