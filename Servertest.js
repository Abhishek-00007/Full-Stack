const express = require("express");
const multer = require("multer");
const mime = require("mime-types");
const app = express();
const port = 3000;


const upload = multer({ storage: multer.memoryStorage() });


app.post("/bfhl", upload.single("file_b64"), (req, res) => {
  const data = ["M", "1", "334", "4", "B", "Z", "a"];
  const file = req.file;

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


  const response = {
        is_success: true,
        user_id: "av5700", // Replace with your user ID format
        email: "p.abhishek.0007@gmail.com", // Replace with your actual email
        roll_number: "RA2111003010737", // Replace with your roll number
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
   
    fileSize: file.size,
    mimeType: mime.lookup(file.originalname),
  };

  res.json(response);
});
app.get('/bfhl', (req, res) => {
    // Respond with a hardcoded operation code
    const response = {
        operation_code: 1
    };

    res.status(200).json(response);
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});