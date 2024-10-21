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
        rejectUnauthorized: true, // Adjust for your environment
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

console.log('memberShipExpiry Trigger has succesfully loaded.');

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to send membership expiry emails
const sendMembershipExpiryEmail = (membership) => {
    const { email, membershipID, endDate } = membership;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Membership Expiration Reminder',
        text: `Dear Customer, \n\n your membership (ID: ${membershipID}) will unfortunately expire on ${endDate}. Please proceed to renew your membership soon, in order to continue enjoying our services.Have a Nice Day!\n\nBest regards,\nMuseum Fine Arts Houston`
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
    console.log('Running membership expiry check...');

    const query = `
        SELECT m.membershipID, c.email, m.endDate
        FROM membership m
        JOIN customer c ON m.customerID = c.customerID
        WHERE m.endDate BETWEEN CURDATE() AND CURDATE() + INTERVAL 30 DAY;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return;
        }

        results.forEach(membership => {
            sendMembershipExpiryEmail(membership);
        });
    });
});

// USE THE FOLLOWING TO TEST
//const testMembership = {
//    email: 'test123@gmail.com', // replace with your own email
//    membershipID: 101,
//    endDate: '2024-11-15'
//};
//sendMembershipExpiryEmail(testMembership);
