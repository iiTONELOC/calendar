const User = require('./User');
const Events = require('./Events');
const Reminders = require('./Reminders');
const Categories = require('./Categories')

User.hasMany(Events, {
    foreignKey: 'user_id'
});

Events.belongsTo(User, {
    foreignKey: 'user_id',
    
});
Reminders.belongsTo(User, {
    foreignKey: 'user_id',
});

Events.hasMany(Reminders, {
    foreignKey: 'event_id',
    onDelete: "CASCADE"
});

Reminders.belongsTo(Events, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
});

User.hasMany(Reminders, {
    foreignKey: 'user_id',
});

Categories.hasMany(Events, {
    foreignKey: 'category_id'
});
Events.belongsTo(Categories, {
    foreignKey: 'category_id'
});

// EVENTS ARE WRONG




module.exports = { User, Events, Reminders, Categories };