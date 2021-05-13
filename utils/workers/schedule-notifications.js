
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

                return {
                    currentReminders: response.data[0].reminders,
                    user: response.data
                };
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
            currentReminders = obj.currentReminders.filter(el => el.event.day == d && el.event.month == m && el.event.year == y);
        } else {
            currentReminders = obj.filter(el => el.event.day == d && el.event.month == m && el.event.year == y);
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
        let events = [];
        let expired = [];
        let notifying = [];
        if (reminderArr.length) {
            // NEED TO MUTATE DATA LIST NEVER ENDS
            console.log('EVENTS FOUND!')
            reminderArr.forEach(el => {
                const reminderTime = ((new Date(el.before).getTime()));
                const dif = (reminderTime - currentTime) / 60000
                // console.log(dif)
                if (dif < 0) {
                    // console.log("Expired Events")
                   return expired.push(el)


                } if (dif >= 0 && dif <= 5) {
                   return events.push(el)


                }
            });
        

            if (events.length) {
                console.log("++++++++++++++++\nREMINDERS TO SEND OFF", events)

                // mutate array, when empty it will stop
                // setInterval(function () {
    
                //     console.log("expired events", expired)
                //     console.log("Upcoming events!", events)
                //     console.log('USER INFO', userArray)
                //     // if (reminderArr.length) {
                //     //     // NEED TO MUTATE DATA LIST NEVER ENDS
                //     //     reminderArr.forEach(el => {
                //     //         const reminderTime = ((new Date(el.before).getTime()));
                //     //         const dif = (reminderTime - currentTime) / 60000
                //     //         console.log(dif)
                //     //         if (dif < 0) {
                //     //             // console.log("Expired Events")
                //     //             expired.push(el)
    
    
                //     //         } if (dif >= 0 && dif <= 5) {
                //     //             events.push(el)
    
    
                //     //         }
                //     //     });
                //     // }
                //     // console.log("timer is running")
                //     // console.log("events", events)
                //     // if (events.length) {
                //     //     for (let i = 0; i < events.length; i++) {
                //     //         const el = events[i];
                //     //         notifying.push(el);
                //     //     }
                //     //     console.log(notifying, "Notifications to be sent")
                //     // }
                // }, 60000)
            }

            if(expired.length){
                console.log("++++++++++++++++\nEXPIRED!, SEND FOR DELETION",expired)
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