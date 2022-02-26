const router = require('express').Router();
const { User } = require('../../models');

// GET ALL users
router.get('/', (req, res) => {
    // Access our User Model and run .findAll() method
    User.findAll()
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET User by ID
router.get('/:id', (req, res) => {});

// POST/CREATE a New User
router.post('/', (req, res) => {});

// PUT/UPDATE a User by ID
router.put('/:id', (req, res) => {});

// DELETE a User by ID
router.delete('/:id', (req, res) => {});

module.exports = router;