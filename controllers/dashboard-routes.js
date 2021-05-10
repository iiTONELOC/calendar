const router = require('express').Router();
const CalRender = require('../utils/render-calendar');
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
    res.render('dashboard', {
        loggedIn, deflt, month, user, user_id
    })


})

module.exports = router;