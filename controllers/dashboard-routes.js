const router = require('express').Router();

router.get('/', (req,res) => {
    if(!req.session.loggedIn){
        res.render('login')
        return;
    }
    loggedIn = req.session.loggedIn
    res.render('dashboard',{
        loggedIn
    })
})

module.exports = router;