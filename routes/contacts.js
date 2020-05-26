const express = require('express');
const router = express.Router();

//get logged in user pvt route
router.get('/', (req, res) => {
    res.send('get logged in user');
});

//Authenticate user and get token
router.post('/', (req, res) => {
    res.send('login user');
});

module.exports = router;