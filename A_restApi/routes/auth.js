const express = require("express");
require('dotenv').config();
const axios = require('axios');

const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

router.post('/generateEmail', async (req, res) => {
    const { prompt } = req.body;

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
