const User = require('./User');
const Events = require('./Events');
const Reminders = require('./Reminders');

User.hasMany(Events, {
    foreignKey: 'user_id'
});

Events.belongsTo(User, {
    foreignKey: 'user_id',
    
});
Reminders.belongsTo(User, {
    foreignKey: 'user_id',
});

Reminders.belongsTo(Events, {
    foreignKey: 'events_id',
    onDelete: 'CASCADE'
});

User.hasMany(Reminders, {
    foreignKey: 'user_id',
});

Events.hasMany(Reminders, {
    foreignKey: 'reminders_id',
    onDelete: "CASCADE"
});

module.exports = { User, Events, Reminders };