const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');

require('dotenv').config();

// Connecting MySQL DB
const db = mysql.createConnection({
    host: process.env.DB_HOST,      
    user: process.env.DB_USER,      
    password: process.env.DB_PASSWORD, 
    database: "museum",
    ssl: {
        rejectUnauthorized: true, // or false if you want to allow self-signed certificates
    }
});

// Check for connection errors
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

console.log('creditCardExpiry Trigger has succesfully loaded.');

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: process.env.EMAIL_USER, //company email
        pass: process.env.EMAIL_PASSWORD //company password
    }
});

// Function to send email notifications
const sendEmailNotification = (customer) => {
    const { email, creditCardNumber, expiryDate } = customer; 

    const mailOptions = {
        from: process.env.EMAIL_USER, //COMPANY email
        to: email,
        subject: 'Credit Card Expiration Reminder',
        text: `Dear Customer, \n\n your credit card ending in ${creditCardNumber.slice(-4)} is unfortunately expiring on ${expiryDate}. Please proceed to update your payment information to avoid service interruptions.Have a Nice Day!\n\nBest regards,\nMuseum Fine Arts Houston`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending email to ${email}:`, error);
        } else {
            console.log(`Email sent to ${email}:`, info.response);
        }
    });
};

// Cron job to run every day at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running credit card expiry check...');

    // Query to select customers with expiring credit cards
    const query = `
        SELECT customerID, creditCardNumber, expiryDate, email 
        FROM customer // Ensure this matches your actual table name
        WHERE expiryDate BETWEEN CURDATE() AND CURDATE() + INTERVAL 30 DAY;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return;
        }

        // Send email notifications for each customer with expiring credit cards
        results.forEach(customer => {
            sendEmailNotification(customer);
        });
    });
});

// USE THE FOLLOWING TO TEST
//const testCustomer = {
//    email: 'test123@gmail.com', // Replace with your test email
//    creditCardNumber: '1234567812345678',
//    expiryDate: '2024-12-31' 
//};
//sendEmailNotification(testCustomer);

