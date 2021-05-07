const router = require('express').Router();
const { Reminders } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Reminders.findAll()
        .then(dbRemindData => res.json(dbRemindData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/',  (req, res) => {
    
    Reminders.create({
        user_id: req.session.user_id,
        event_id: req.body.event_id,
        before: req.body.before,
    })
        .then(dbRemindData => res.json(dbRemindData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id',  (req, res) => {
    Reminders.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbRemindersData => {
            if (!dbRemindersData) {
                res.status(404).json({ message: 'No Reminders found with this id!' });
                return;
            }
            res.json(dbRemindersData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id',  (req, res) => {
    Reminders.update(req.body,{
        where: {
            id: req.params.id
        }
    })
        .then(dbRemindersData => {
            if (!dbRemindersData) {
                res.status(404).json({ message: 'No Reminders found with this id!' });
                return;
            }
            res.json(dbRemindersData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;