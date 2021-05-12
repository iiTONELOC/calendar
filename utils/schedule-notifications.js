const CalRender = require('./render-calendar');
const { User, Events, Reminders } = require('../models');
const currentTime = new Date();
const { Op } = require('sequelize');

// check all users with phone numbers, grab notification list,
// check current time against scheduled reminder time,
//  if it is alert user
// successful message response, delete notification.

const userData =  User.findAll({
    where:{
        phone_number:{
            [Op.not]: null,
        }
    },
    include: [
        {
            model: Reminders,
            include: {
                model: Events,
                attributes: ['name']
            }
        },

    ]
}).then(res=>{
    return res.json()
}).catch(e=>{
    console.log(e)
})

console.log(userData)