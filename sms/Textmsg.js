
const twilio = require('twilio');
const accountSid = process.env.ACCOUNT;
const authToken = process.env.AUTH;
const numAuth = process.env.NUM;
const client = new twilio(accountSid, authToken);
const Delete = require('../utils/workers/delete-notifications');
const moment = require('moment');
// const Remind = require ("../utils/workers/schedule-notifications")

class Text {


    static async notify(events) {
        // console.log('HERE')
        // console.log(events)
        // loop through events, if reminder time = now, send off 
        const reminders = events.reminders

        const toRemove = [];
        reminders.forEach(el => {
            if (el.remaining <= 0) {


                toRemove.push(el);
            }
        });

        if (toRemove.length > 0) {
            toRemove.forEach(el => {
                
                const number = el.user_phone[0].phone_number;
                const title = el.event.name;
                const starts = el.event_start;
                const userName = el.user_phone[0].username;
                const date = moment(`${el.event.month}/${el.event.day}/${el.event.year}`).format('dddd [the] Do [of] MMMM');
                
                const reminderResponse =  client.messages.create({
                    body: `Hello ${userName}!\nYour event  ${title}, scheduled for\n${date} \nstarts in ${starts}.\nView your calendar here\nhttps://my-caltasker.herokuapp.com/dashboard`,
                    from: `${numAuth}`,
                    to: `${number}`
                })
                    .then(message => {
                        console.log(message)
                        Delete.expiredNotifications(toRemove)
                    })
                    .catch(e => console.log(e))
                    .done()
                return reminderResponse
            })


           
        }

    }
}


module.exports = Text;