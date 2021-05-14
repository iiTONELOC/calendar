
const fetch = require('node-fetch');
const CalRender = require('../../utils/render-calendar');
// const m = CalRender.currentMonth();
// const d = CalRender.currentDay();
// const y = CalRender.currentYear();
// const moment = require('moment');
const Text = require('../../sms/Textmsg');
require('dotenv').config();
let url = 'https://my-caltasker.herokuapp.com/';



/*
// check all users with phone numbers, grab notification list,
// check current time against scheduled reminder time,
//  if it is alert user
// successful message response, delete notification.
*/

class Remind extends Text {

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
                    return (filter = false, rS = false);


                } else {
                    return {
                        currentReminders: response.data,
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

        const user = obj.user.filter(el => {
            const r = el.reminders.length
            if (r === undefined || r === 'undefined' || r === 0) {
                return el = ''
            } else {
                return el
            }
        })
        const currentReminders = obj.currentReminders.filter(el => {
            const d = el.reminders.length;
            if (d === undefined || d === 'undefined' || d === 0) {

                console.log(`${el.username} has no active reminders!`)
                return el = ''
            } else {
                return el
            }

        });


        if (runScheduler) {
            const data = {
                reminders: currentReminders,
                user: user
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


        const reminderArr = obj.reminders;
        const userArray = obj.user
        let notifyArr = [];
        let expiredArr = [];
        let holder = [];

        // check for reminders
        if (reminderArr.length) {
            // NEED TO MUTATE DATA LIST NEVER ENDS
            console.log('EVENTS w/REMINDERS FOUND!')
            // push elements to appropriate arrays
            const reminders = reminderArr.map(el => {
                return el.reminders
            });
            // console.log("all rems",reminders)
            reminders.forEach(el => {
                for (let i = 0; i < el.length; i++) {
                    const element = el[i];
                    holder.push(element);
                }
            });

            const users = (data) => userArray.filter(el => {
                if (el.id === data) {
                    return el.phone_number
                }
            })


            holder.forEach(en => {
                const currentTime = new Date(Date.now()).getTime();
                const reminderTime = ((new Date(en.before).getTime()));
                const dif = (reminderTime - currentTime) / 60000;
    
                if (dif < -.5) {
                    // send to expiredArr
                    return expiredArr.push(en)
                } if (dif >= -.6 && dif <= 1) {
                    // send to notify
                
                    const data = {
                        id: en.id,
                        user_id: en.user_id,
                        user_phone: users(en.user_id),
                        event: en.event,
                        event_start: en.starts_in,
                        remaining: dif
                    }
                    // console.log(data)
                    notifyArr.push(data)
                }
            });

            if (notifyArr.length) {
                // console.log("++++++++++++++++\nREMINDERS TO SEND OFF", notifyArr)
                // console.log('USER ARRAY', userArray);
                // console.log("+++++++++++\n");
                // console.log("NOTIFICATIONS", notifyArr);

                const data = {
                    reminders: notifyArr,
                };

                return Text.notify(data);
            } else {
                console.log("No Reminders need to be sent!")
            }

            // if expired send to be deleted
            if (expiredArr.length) {
                console.log("++++++++++++++++\nEXPIRED!, SEND FOR DELETION",/*, expiredArr*/)
            }
        } else {
            return
        }
    }


}

module.exports = Remind;