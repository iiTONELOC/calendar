const calendar = require('node-calendar');
const moment = require('moment');

class CalRender {
    /* 
    /* Creates object of monthly layout
    /* If year and month are blank
    /* will create for current month
    */  
    static async createCalMonth(month, year) {
        let m = month
        let y = year
        if (m === undefined ) {
            m = moment(new Date()).format('M')
        }if (y === undefined) {
            y = moment(new Date()).format('YYYY')
        }
        const data = new calendar.Calendar(6).monthdayscalendar(y,m)
        
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