const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

//get all contacts of a user
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

//add new contact
router.post('/', [auth, [
    check('name', 'name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name, email, phone, type, user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;