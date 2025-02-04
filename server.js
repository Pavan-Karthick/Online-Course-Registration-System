const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Import MySQL2

const app = express();

// Middleware to parse the body of the request (MUST be before the routes)
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (HTML, CSS, JS) from the root directory
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Default MySQL user for XAMPP
    password: '', // Default MySQL password for XAMPP
    database: 'course_registration' // The database you created
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error: ' + err.stack);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Set up a route for the homepage (your register page)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html'); // Path to your HTML file
});

// Handle the registration form submission (POST request)
app.post('/register', (req, res) => {
    const { name, email, pass, c_pass } = req.body; // Get form data from the request

    // Simple validation (check if passwords match)
    if (pass !== c_pass) {
        return res.send("Passwords do not match!");
    }

    // Insert data into MySQL database
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, pass], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database: ', err);
            return res.send("Error in registration.");
        }

        console.log('User registered with ID: ' + result.insertId);
        res.send("Registration successful!");
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
