const router = require('express').Router();

router.get('/', (req,res) => {
    if(!req.session.loggedIn){
        res.render('login')
        return;
    }
    loggedIn = req.session.loggedIn
    const deflt = true
    res.render('dashboard',{
        loggedIn, deflt
    })
})

module.exports = router;