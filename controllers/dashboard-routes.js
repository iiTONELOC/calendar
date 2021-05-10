const router = require('express').Router();
const CalRender = require('../utils/render-calendar');
router.get('/', async (req, res) => {
    if (!req.session.loggedIn) {
        res.render('login')
        return;
    }
    loggedIn = req.session.loggedIn
    const deflt = true
    const month = await CalRender.createCalMonth()
    res.render('dashboard', {
        loggedIn, deflt, month
    })


})

module.exports = router;