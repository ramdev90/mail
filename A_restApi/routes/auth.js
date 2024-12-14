const express = require("express");
require('dotenv').config()

const router = express.Router();

// TODO
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const axios = require('axios');


router.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: 'gpt-3.5-turbo', // or use 'gpt-3.5-turbo'
                //   messages: [{ role: 'user', content: prompt }],
                "messages": [
                    // {
                    //     "role": "system",
                    //     "content": "You are a helpful assistant that can generate emails and subjects based on provided information."
                    // },
                    {
                        "role": "user",
                        "content": "Based on the following data, generate a subject and an email in plain json format only with string:\n\n66720178745\tjoinhashtaghr\thashtagHR.com\thttps://www.instagram.com/joinhashtaghr/\thttps://instagram.fraj3-2.fna.fbcdn.net/v/t51.2885-19/440626195_823049123011045_3508093147676029276_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fraj3-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=5wZAzLKfPF0Q7kNvgGjTL08&_nc_gid=a3259e254d864f2a8e5ae6aff14c83b2&edm=AEF8tYYBAAAA&ccb=7-5&oh=00_AYA1UCP3lX56p1qMylYyihTLMwXm0pI_tA81ni9St3WYgg&oe=675478A8&_nc_sid=1e20d2\tNo\tNo\t1068\t0\t#HR\nFind jobs, make connections and hire smarter—everything you need for career success, in one powerful platform!\thello@hashtaghr.com\t140\tNO\tYES\thttps://hashtaghr.com"
                    }
                ],
                response_format: {
                    "type": "json_object"
                },
                max_tokens: 200,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );


        // Send the response from OpenAI to the frontend
        const { subject, email } = response.data.choices[0].message.content;
        console.log('Generated Subject:', subject);
        console.log('Generated Email:', email);

        res.json({
            message: response.data.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing request' });
    }

});

module.exports = router;
