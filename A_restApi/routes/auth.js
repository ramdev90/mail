const express = require("express");
require('dotenv').config();
const axios = require('axios');

const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

router.post('/generateEmail', async (req, res) => {
    const { prompt } = req.body;
    const selectedMailType = req.body.selectedMailType;

    if (selectedMailType === 'static') {
        return res.json({
            // subject: 'Invitation to Join Our Upwork Agency',
            // email: `    <p>Dear ${prompt.toString().slice(1, -1)},</p>
            //             <p>I hope you're doing well.</p>
            //             <p>I've noticed your profile on Upwork and I'm reaching out on behalf of an Upwork agency that is currently expanding its talented team. We are a group of skilled professionals and are looking to grow further by bringing on board high-quality freelancers like yourself.</p>
            //             <p>Before officially inviting you to join our agency, we'd love to schedule a brief call with you. This will give us the opportunity to get to know you better, understand your skills and interests, and discuss how we can work together to achieve mutual success.</p>
            //             <p>If you're interested, please send your updated CV and let me know a convenient time for you, and we can arrange a meeting via [Zoom/Skype/Google Meet].</p>
            //             <p>I look forward to connecting with you soon.</p>
            //             <p>Thank you!</p>
            //             `
            subject: 'Interest in Joining Your Upwork Agency',
            email: `    <p>Dear ${prompt.toString().slice(1, -1)},</p>
                        <p>I hope you're doing well.</p> 
                        <p>I've recently come across your agency on Upwork and was impressed by the work you're doing. As a skilled freelancer with experience in Mean stack, I believe my skills and background would be a great fit for your team.</p> 
                        <p>I'm currently looking for opportunities to collaborate with agencies like yours, where I can contribute my expertise and work on exciting projects. I’d love to join your team and contribute to the success of your clients while continuing to grow professionally.</p> 
                        <p>If you're open to it, I would appreciate the chance to schedule a brief call to introduce myself, share my portfolio, and discuss how I can add value to your agency's efforts. Please let me know a convenient time for you, and we can arrange a meeting via Zoom, Skype, or Google Meet, whichever works best for you.</p> 
                        <p>Thank you for considering my application. I look forward to the opportunity to connect with you soon!</p> 
                        <p>Best regards,</p>
                        <p>Ramdev</p>
                        `
        });
    }

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Call OpenAI API to generate the subject and email
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: 'gpt-3.5-turbo', // or 'gpt-4', depending on which model you want to use
                messages: [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that can generate email subjects and email content based on the provided input."
                    },
                    //                     {
                    //                         "role": "user",
                    //                         "content": `Based on the following data, generate a subject and an email in plain JSON format only with strings (subject and email keys):

                    // 66720178745\tjoinhashtaghr\thashtagHR.com\thttps://www.instagram.com/joinhashtaghr/\thttps://instagram.fraj3-2.fna.fbcdn.net/v/t51.2885-19/440626195_823049123011045_3508093147676029276_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fraj3-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=5wZAzLKfPF0Q7kNvgGjTL08&_nc_gid=a3259e254d864f2a8e5ae6aff14c83b2&edm=AEF8tYYBAAAA&ccb=7-5&oh=00_AYA1UCP3lX56p1qMylYyihTLMwXm0pI_tA81ni9St3WYgg&oe=675478A8&_nc_sid=1e20d2\tNo\tNo\t1068\t0\t#HR\nFind jobs, make connections and hire smarter—everything you need for career success, in one powerful platform!\thello@hashtaghr.com\t140\tNO\tYES\thttps://hashtaghr.com`
                    //                     }
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens: 300,
                temperature: 0.0, // Adjust the creativity level as per your requirement
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Extract the response text from OpenAI
        const openaiResponseText = response.data.choices[0].message.content.trim();

        // Assuming the response is returned in a correct plain-text format for email and subject
        console.log('Generated Email Content:', JSON.parse(openaiResponseText));

        console.log('subject:', JSON.parse(openaiResponseText)?.subject);
        console.log('email:', JSON.parse(openaiResponseText)?.email);

        // Send the generated email content back to the client
        res.json({
            subject: JSON.parse(openaiResponseText)?.subject,
            email: JSON.parse(openaiResponseText)?.email
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
});

module.exports = router;
