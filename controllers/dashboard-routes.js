const router = require('express').Router();
const CalRender = require('../utils/render-calendar');
const Events = require('../models/Events');
const Reminders = require('../models/Reminders');
const Categories = require('../models/Categories');

router.get('/', async (req, res) => {

    if (!req.session.loggedIn) {
        res.render('login')
        return;
    }
    loggedIn = req.session.loggedIn;
    const user = req.session.username;
    const user_id = req.session.user_id;
    const deflt = true
    const month = await CalRender.createCalMonth()
    // GRABS USER EVENTS FOR THE CURRENT MONTH
    let response = await Events.findAll({
        where: {
            user_id: user_id,
            month: `${CalRender.currentMonth()}`,
            year: `${CalRender.currentYear()}`
        },
        include: [
            {
                model: Reminders,
            },
            {
                model: Categories,
                attributes: ['name']
            }
        ]
    })


    const events = response.map(el => el.get({ plain: true }));
    
    res.render('dashboard', {
        loggedIn, deflt, month, user, user_id, events
    })


})

module.exports = router;