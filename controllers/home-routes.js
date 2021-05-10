const router = require('express').Router();
const CalRender = require("../utils/render-calendar")

router.get('/', async (req, res) => {
    loggedIn = req.session.loggedIn
    if (loggedIn) {
        const user = req.session.username
        const user_id = req.session.user_id;
        const deflt = true
        const month = await CalRender.createCalMonth()
        res.render('dashboard', {
            loggedIn, deflt, month, user, user_id
        })
        return
    }
    res.render('home')

})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/sign-up', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('sign-up');
});

router.get('/create-task', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    loggedIn = req.session.loggedIn
    res.render('create-task', {
        loggedIn
    })
})
module.exports = router