const router = require('express').Router();
const { User } = require('../../models');

// GET ALL users
router.get('/', (req, res) => {
    // Access our User Model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET User by ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this ID'});
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST/CREATE a New User
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Login Route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'Username not Found' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Password' });
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
});

// PUT/UPDATE a User by ID
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No User found with this ID' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

// DELETE a User by ID
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this ID' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;