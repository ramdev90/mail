const express = require("express");
const router = express.Router();

const multer = require('multer');
const XLSX = require('xlsx');
const { MongoClient } = require('mongodb');
const path = require('path');


// const mailController = require("../controllers/mail");


// router.post('/send-email', mailController.sendMail);


// Setup Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Store files in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp for filenames
    },
});

const upload = multer({ storage: storage });

// MongoDB connection URI
const mongoURI = process.env.MONGOURI
const dbName = 'email'; // Database name
const collectionName = 'general-mail'; //req.body.collectionName

// Route to handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        console.log(req.file)
        const filePath = req.file.path;

        // Read the Excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON
        let jsonData = XLSX.utils.sheet_to_json(sheet);

        jsonData = jsonData.filter(el => el?.["Public email"]).map(el => ({ ...el, sent: 0 }));

        console.log(jsonData, "jsonData")

        // Connect to MongoDB
        const client = new MongoClient(mongoURI);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert data into MongoDB    
        await collection.insertMany(jsonData, { ordered: false });

        // Close the connection
        await client.close();

        res.send('File uploaded and data inserted into MongoDB successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing file.');
    }
});



module.exports = router;