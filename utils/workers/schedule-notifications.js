
const e = require('express');
const fetch = require('node-fetch');
const CalRender = require('../../utils/render-calendar');
const m = CalRender.currentMonth();
const d = CalRender.currentDay();
const y = CalRender.currentYear();
const moment = require('moment');
const tm = moment;
require('dotenv').config();
let url = 'https://my-caltasker.herokuapp.com/';
const Text = require('../../sms/Textmsg')

/*
// check all users with phone numbers, grab notification list,
// check current time against scheduled reminder time,
//  if it is alert user
// successful message response, delete notification.
*/

class Remind {

    /*
    // pass in two variables
    // 1st one if you want to chain getting reminders and filtering reminders
    // 2nd variable if you want to then run the scheduler function
    */
    static async getReminders(filter, rS) {
        if (process.env.DEV) {
            url = 'http://localhost:3001/'
        }
        const d = await fetch(`${url}api/reminders/scheduled`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.status != 200) {
                    return console.error("Error!", res)
                }
                if (res.status == 200) {
                    return res.json()
                }
            })
            .then(response => {
                if (response.data[0] == "undefined" || response.data[0] == undefined) {
                   return(filter = false, rS = false);
                   

                } else {
                    return {
                        currentReminders: response.data[0].reminders,
                        user: response.data
                    };
                }

            })
            .catch(e => {
                console.log(e)
                return
            })
        if (filter && rS) {
            Remind.filterReminders(d, true);
        } else if (filter && !rS) {
            Remind.filterReminders(d);
        } else {
            console.log("working as expected")
            return d
        }
    }

    /*
    // pass in one extra variable 
    // if you want to then run the scheduler function
    */
    static async filterReminders(obj, runScheduler) {
        if (!obj) {
            return
        }
        let currentReminders;
        if (!obj[0]) {
            currentReminders = obj.currentReminders.filter(el => el.event.month == m && el.event.year == y);
        } else {
            currentReminders = obj.filter(el => el.event.month == m && el.event.year == y);
        }
        if (runScheduler) {
            const data = {
                reminders: currentReminders,
                user: obj.user
            }
            Remind.runScheduler(data)
        }
    }

    /*
    // requires an object, the data is expected to be prepared for todays events only
    // this will check current time against reminder time
    // 5Ms prior it will fire a function to send the message, after 4m15s elapses
    */
    static async runScheduler(obj) {
        // current time needs to be in the loop 
        const currentTime = new Date(Date.now()).getTime();
        const reminderArr = obj.reminders;
        const userArray = obj.user
        let notifyArr = [];
        let expiredArr = [];
        if (reminderArr.length) {
            // NEED TO MUTATE DATA LIST NEVER ENDS
            console.log('EVENTS w/REMINDERS FOUND!')
            // push elements to appropriate arrays
            reminderArr.forEach(el => {
                const reminderTime = ((new Date(el.before).getTime()));
                if (process.env.DEV) {
                    // reminderTime -= 14400000
                    console.log("local env")
                }
                console.log(reminderTime, "reminder time")
                const dif = (reminderTime - currentTime) / 60000
                // console.log(dif)
                // send to expiredArr
                if (dif < 0) {
                    // console.log("expiredArr notifyArr")
                    return expiredArr.push(el)
                } if (dif >= -1 && dif <= 5) {
                    // send to 
                    return notifyArr.push(el)
                }
            });

            // if notifications filter users to get ph
            if (notifyArr.length) {
                // console.log("++++++++++++++++\nREMINDERS TO SEND OFF", notifyArr)
                console.log('USER ARRAY', userArray);
                console.log("+++++++++++\n");
                console.log("NOTIFICATIONS", notifyArr);
            }

            // if expired send to be deleted
            if (expiredArr.length) {
                console.log("++++++++++++++++\nEXPIRED!, SEND FOR DELETION", expiredArr)
            }
        }
        // check the arrays next

        // THIS WORKS NEED TO MOVE THE TIMER TO THE SERVER FILE SO IT IS ALWAYS FRESH DATA

    }
}



// const pastEvents = reminderArr.filter(el => el.reminders.before >= 0);
// console.log(currentTime, "current");
// console.log(reminderTime, 'reminder');


// console.log('diff',dif)

//         console.log(new Date().getTime())
//     }
// }






module.exports = Remind;