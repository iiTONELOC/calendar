const router = require('express').Router();
const { Events, User, Reminders, Categories } = require('../../models');
// const withAuth = require('../../utils/auth');
const CalRender = require('../../utils/render-calendar');


router.get('/', (req, res) => {
    console.log('======================');
    Events.findAll({
        include: [
            {
                model: Reminders,
            },
            {
                model: Categories,
                attributes: ['name']
            },
            {
                model: User,
                attributes: ['username', 'id']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// returns events with reminders for current day.
router.get('/reminders', (req, res) => {
    console.log(req.session.user_id)
    const currentDate = CalRender.currentMonth();
    Events.findAll({
        where: {
            user_id: req.session.user_id,
            month: currentDate,
        },
        include: [
            {
                model: Reminders,
            },
            {
                model: Categories,
                attributes: ['name']
            },
        ]
    })
        .then(dbRemindData => res.json(dbRemindData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Events.findOne({
        where: {
            id: req.params.id
        },

        include: [
            {
                model: Reminders,
            },
            {
                model: Categories,
                attributes: ['name']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No event found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    let d = req.body.date;
    m = d.split('-')[0];
    da = d.split('-')[1];
    y = d.split('-')[2];

    console.log(m, da, y)
    Events.create({
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        user_id: req.body.user_id,
        date: req.body.date,
        time: req.body.time,
        important: req.body.important,
        month: m,
        day: da,
        year: y,
    })
        .then(dbPostData => res.status(201).json(
            {id: dbPostData.id}
        ))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Events.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No event found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Events.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No event found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;