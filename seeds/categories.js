const Categories = require('../models/Categories');
const sequelize = require('../config/connection');

const catData = [
  {
    name: 'Health',
  
  },
  {
    name: 'Travel',
    
  },
  {
    name: 'Personal',
    
  },
  {
    name: 'Other',
  
  }
];

sequelize
  .sync({ force: false })
  .then(() => {
    return Categories.bulkCreate(catData);
  })
  .then(dbCatData => {
    console.log('Categories seeded!');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
