const router = require('express').Router();
const CalRender = require('../utils/render-calendar');
router.get('/', async (req,res) => {
    if(!req.session.loggedIn){
        res.render('login')
        return;
    }
    loggedIn = req.session.loggedIn
    const deflt = true
    const month = CalRender.createCalMonth(2021, 5);

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.render('dashboard',{
        loggedIn, deflt, month
    })
})

module.exports = router;