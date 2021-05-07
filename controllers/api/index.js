const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const eventsRoutes = require('./events-routes');
const remindersRoutes = require('./reminders-routes');

router.use('/users', userRoutes);
router.use('/events', eventsRoutes);
router.use('/reminders', remindersRoutes);

module.exports = router;