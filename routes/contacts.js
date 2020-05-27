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

router.put('/:id', auth, async (req, res) => {

    const { name, email, phone, type } = req.body;

    //Build contact object
    const contactFeilds = {};
    if (name) contactFeilds.name = name;
    if (email) contactFeilds.email = email;
    if (phone) contactFeilds.phone = phone;
    if (type) contactFeilds.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        //make sure user owns contact (logged in user should be the user that owns the contact)
        if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        //update
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFeilds }, { new: true });

        res.json(contact);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//delete contact
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        //make sure user owns contact (logged in user should be the user that owns the contact)
        if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        //update
        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Contact Removed' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;