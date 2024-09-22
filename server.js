const express = require('express');
const bodyParser = require('body-parser');
const mime = require('mime-types'); // npm install mime-types if not installed

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Basic GET route to test server
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// POST Endpoint: /bfhl
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Arrays to hold numbers and alphabets
    const numbers = [];
    const alphabets = [];
    let highestLowercase = null;

    // Iterate over the data array
    data.forEach(item => {
        if (!isNaN(item)) {
            // Item is a number
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            // Item is an alphabet
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                // Find highest lowercase alphabet
                if (!highestLowercase || item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        }
    });

    // File handling (base64 decoding)
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKb = 0;

    if (file_b64) {
        try {
            const buffer = Buffer.from(file_b64, 'base64');
            fileValid = buffer.length > 0;

            // Dynamically detect MIME type using mime-types library
            fileMimeType = mime.lookup(buffer) || 'application/octet-stream';
            fileSizeKb = (buffer.length / 1024).toFixed(2); // File size in KB
        } catch (err) {
            fileValid = false; // Invalid base64 data
        }
    }

    // Prepare response object
    const response = {
        is_success: true,
        user_id: "your_name_yourbirthdate", // Replace with your user ID format
        email: "your_email@example.com", // Replace with your actual email
        roll_number: "YourRollNumber", // Replace with your roll number
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    };

    // Send the response
    res.status(200).json(response);
});

// GET Endpoint: /bfhl
app.get('/bfhl', (req, res) => {
    // Respond with a hardcoded operation code
    const response = {
        operation_code: 1
    };

    res.status(200).json(response);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
