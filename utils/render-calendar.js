const calendar = require('node-calendar');

class CalRender {
    // function to return month
    // year is 4 digit
    // month is single digit ex 1-9 10-12
    static async createCalMonth(month, year) {
        const data = new calendar.Calendar(6).monthdayscalendar(year, month)

        return {
            row1: data[0],
            row2: data[1],
            row3: data[2],
            row4: data[3],
            row5: data[4],
            row6: data[5]
        }
    }
}



module.exports = CalRender