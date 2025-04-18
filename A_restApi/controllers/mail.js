const { Pulse } = require('@pulsecron/pulse');
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');
const { getDatabaseClient } = require("../utils/db");


const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.MAILPORT,
    secure: false,
    // service: 'gmail',
    auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_AUTH
    },
});

const mongoConnectionString = process.env.MONGOURI
const pulse = new Pulse({
    db: { address: mongoConnectionString, collection: 'cronjob' },
    defaultConcurrency: 4,
    maxConcurrency: 4,
    processEvery: '10 seconds',
    resumeOnRestart: true,
});

pulse.on('success', (job) => {
    console.log(`Job <${job.attrs.name}> succeeded`);
});

pulse.on('fail', (error, job) => {
    console.log(`Job <${job.attrs.name}> failed:`, error);
});

pulse.define(
    'send email',
    async (job, done) => {
        const { to, subject, message } = job.attrs.data;
        const mailOptions = {
            from: process.env.SEND_EMAIL,
            to,
            bcc: "ramdevrathod900@gmail.com", // BCC to your email
            subject,
            html: message,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}`);
            done();
        } catch (error) {
            console.error(`Failed to send email to ${to}`, error);
            done(error);
        }
    },
    { shouldSaveResult: true }
);



exports.sendMail = async (req, res) => {
    try {
        await pulse.start();

        let { to, subject, message } = req.body;

        const job = pulse.create('send email', { to, subject, message });
        await job.schedule(new Date()).save();
        res.status(200).send('Email scheduled successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to schedule email');
    }
}

exports.getEmail = async (req, res) => {
    const mongoURI = process.env.MONGOURI;
    const dbName = 'email'; // Database name
    const collectionName = req.query.collectionName || 'general-mail'; // Collection name
    console.log(collectionName)
    const client = new MongoClient(mongoURI);

    try {

        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);


        const document = await collection.aggregate([
            { $match: { sent: 0 } },
            { $sample: { size: 1 } }
        ]).next();

        console.log(document, "doc")


        if (document) {
            if(collectionName != 'general-mail')
            await collection.updateOne({ _id: document._id }, { $set: { sent: 1 } });
            res.json(document)
        } else {
            console.log('No document found.');
        }
    } catch (error) {
        console.error('Error finding document:', error);
    } finally {

        await client.close();
    }
};
