const router = require('express').Router();
const { Categories } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Categories.findAll()
        .then(dbCatData => res.json(dbCatData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Categories.findOne({
        where: {
            id: req.params.id
        },
        
    })
        .then(dbCatData => {
            if (!dbCatData) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.json(dbCatData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/',  (req, res) => {
    console.log(`++++++++++++++++++++`)
    Categories.create({
    name: req.body.name
    })
        .then(dbCatData => res.json(dbCatData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id',  (req, res) => {
    console.log(`++++++++++++++++++++`)
    Categories.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCategoriesData => {
            if (!dbCategoriesData) {
                res.status(404).json({ message: 'No Categories found with this id!' });
                return;
            }
            res.json(dbCategoriesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id',  (req, res) => {
    console.log(`++++++++++++++++++++`)
    Categories.update(req.body,{
        where: {
            id: req.params.id
        }
    })
        .then(dbCategoriesData => {
            if (!dbCategoriesData) {
                res.status(404).json({ message: 'No Categories found with this id!' });
                return;
            }
            res.json(dbCategoriesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;