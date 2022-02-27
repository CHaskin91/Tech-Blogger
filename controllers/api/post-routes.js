const router = require('express').Router();
const { Post, User } = require('../../models');

// Get All Posts
router.get('/', (req, res) => {
    Post.findAll({
        // Query Configuration
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;