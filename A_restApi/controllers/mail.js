const { Pulse } = require('@pulsecron/pulse');
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: 'iamramdevrathod@gmail.com',
        pass: 'enha vkng wnvi kxoj',
    },
});

const mongoConnectionString = 'mongodb+srv://admin:admin@cluster0.ighfd.mongodb.net/Shop?retryWrites=true&w=majority&appName=Cluster0short-url';
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
            from: 'iamramdevrathod@gmail.com',
            to,
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

        // to = "ramdevrathod90@gmail.com"

        const job = pulse.create('send email', { to, subject, message });
        await job.schedule(new Date()).save();
        res.status(200).send('Email scheduled successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to schedule email');
    }
}

exports.getEmail = async (req, res) => {
    const mongoURI = 'mongodb+srv://admin:admin@cluster0.ighfd.mongodb.net/Shop?retryWrites=true&w=majority&appName=Cluster0short-url'; // Change this if using a remote MongoDB
    const dbName = 'Shop'; // Database name
    const collectionName = 'excelData'; // Collection name

    const client = new MongoClient(mongoURI);

    try {

        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // TODO
        // const document = await collection.aggregate([{ $sample: { size: 1 } }]).next();

        const document = await collection.aggregate([
            { $match: { sent: 0 } },
            { $sample: { size: 1 } }
        ]).next();

        // TODO
        await collection.updateOne(
            { _id: document._id },     // Match the document by its '_id'
            { $set: { sent: 1 } }      // Update the 'sent' field to 1
        );




        if (document) {
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
