const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
//IMPORT SESSIONS
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 8640000000,
        sameSite: "Strict",
        secure: false
    },
    resave: false,
    saveUninitialized: true,
    rolling: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;
const Text = require('./sms/Textmsg.js');
const Remind = require("./utils/workers/schedule-notifications")
if (process.env.PORT) {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// turn on routes
app.use(routes);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
})
    .then(async () => {
        // let d = await Text.getReminders();
        // console.log(d)
        // pass in two variables
        // 1st one if you want to chain getting reminders and filtering reminders
        // 2nd variable if you want to then run the scheduler function
       
        setInterval(function () {
            console.log("fetching reminders")
            Text.getReminders(true,true)
                // }
            }, 60000)

    }).catch(e => {
        console.log(e)
    })

// try out notification
// NOTIFICATIONS WORK, MAKE A FN THAT RUNS AND SCHEDULES NOTIFICATIONS
// Text.notify()



// check all users with phone numbers, grab notification list,
// check current time against scheduled reminder time,
//  if it is alert user
// successful message response, delete notification.
// findReminders();