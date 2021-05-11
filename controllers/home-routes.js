const router = require('express').Router();
const CalRender = require("../utils/render-calendar")

router.get('/', async (req, res) => {
    loggedIn = req.session.loggedIn
    if (loggedIn) {
        const user = req.session.username
        const user_id = req.session.user_id;
        const deflt = true
        const month = await CalRender.createCalMonth().then(res=>{return res});
        res.render('dashboard', {
            loggedIn, deflt, month, user, user_id
        })
        return
    }
    res.render('home')

})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.render('/');
        return;
    }

    res.render('login');
});

router.get('/sign-up', (req, res) => {
    if (req.session.loggedIn) {
        const loggedIn = req.session.loggedIn
        res.render('/dashboard',{
            loggedIn
        });
        return;
    }

    res.render('sign-up');
});

router.get('/create-task', (req, res) => {
    if (!req.session.loggedIn) {
        res.render('/login');
        return;
    }
    loggedIn = req.session.loggedIn
    const user_id = req.session.user_id;
    res.render('create-task', {
        loggedIn, user_id
    })
})
module.exports = router