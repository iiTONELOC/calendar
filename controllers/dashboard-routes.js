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
    const row1 = month[0];
    console.log(row1)
    const row2 = month[1];
    const row3 = month[2];
    const row4 = month[3];
    const row5 = month[4];
    res.render('dashboard',{
        loggedIn, deflt, row1, row2, row3, row4, row5
    })
})

module.exports = router;