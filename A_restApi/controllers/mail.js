const { Pulse } = require('@pulsecron/pulse');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
        user: 'iamramdevrathod@gmail.com',
        pass: 'enha vkng wnvi kxoj',
    },
});

// Pulse setup
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
        const { to, subject, text } = job.attrs.data;
        const mailOptions = {
            from: 'iamramdevrathod@gmail.com',
            to,
            subject,
            html: text,
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

        const { to, name } = req.body;


        const subject = "MongoDB Certified with Expertise in Angular/Node.js - Inquiry About Software Engineer Opportunities"
        const text = `
       <p>Hi ${name},</p>
      
      <p>I hope you're doing well. My name is Ramdev and I'm from inda, I'm reaching out to inquire about any Software Engineer opportunities. I have strong experience with Angular, with a focus on the MEAN stack (MongoDB, Express, Angular, Node.js). Additionally, I recently earned my MongoDB certification.</p>
      
      <p>I'm currently exploring new opportunities and would love to learn more about the application process and how I can contribute to your team.</p>
      
      <p>Thank you for your time and consideration. I look forward to hearing from you.</p>
      
      <p>Best regards,<br>Ramdev<br>    
      https://www.linkedin.com/in/rathod-ramdevbhai/<br>
      </p>
      `;
        const job = pulse.create('send email', { to, subject, text });
        await job.schedule(new Date()).save();
        res.status(200).send('Email scheduled successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to schedule email');
    }
}
