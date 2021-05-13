const twilio = require('twilio');
const accountSid = process.env.ACCOUNT;
const authToken = process.env.AUTH;
const num = process.env.NUM;
const client = new twilio(accountSid, authToken);
const Remind = require ("../utils/workers/schedule-notifications")

class Text extends Remind{
    // configure this to take in params
    // user_phone, event_title, event_start_time

    static async notify() {
        const messages = await
            client.messages
                .create({
                    body: "LOOK MA!! NO HANDS!",
                    from: `${num}`,
                    to: '+13528041676'
                })
                .then(message => console.log(message)).catch(e => console.log(e))
                .done()
                
        return messages
    }
}


module.exports = Text;