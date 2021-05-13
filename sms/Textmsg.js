const e = require('express');
const twilio = require('twilio');
const accountSid = process.env.ACCOUNT;
const authToken = process.env.AUTH;
const num = process.env.NUM;
const client = new twilio(accountSid, authToken);
// const Remind = require ("../utils/workers/schedule-notifications")

class Text {


    static async notify(events) {
        // console.log('HERE')
        // console.log(events)
        // loop through events, if reminder time = now, send off 
        const reminders = events.reminders
        // console.log("HERE ",reminders)
        reminders.forEach(el => {
            if (el.remaining <= 0) {
                console.log("Notifying these events now", el)
            }
        });
        // const messages = await
        //     client.messages
        //         .create({
        //             body: "LOOK MA!! NO HANDS!",
        //             from: `${num}`,
        //             to: '+13528041676'
        //         })
        //         .then(message => console.log(message)).catch(e => console.log(e))
        //         .done()

        // return messages
    }
}


module.exports = Text;