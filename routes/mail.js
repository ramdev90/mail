var express = require('express');
var router = express.Router();
const { Pulse } = require('@pulsecron/pulse'); 
// const User = require("../models/upUser");



router.get('/send-mail', function (req, res, next) {
    res.json({ title: 'Express' });
});

router.post('/send-mail', async (req, res) => {
    try {
        await pulse.start();

        const { to, name } = req.body;

        const subject = getSubject();
        const text = getMessage(name);
        const job = pulse.create('send email', { to, subject, text });
        await job.schedule(new Date()).save();
        res.status(200).send('Email scheduled successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to schedule email');
    }
});
module.exports = router;
