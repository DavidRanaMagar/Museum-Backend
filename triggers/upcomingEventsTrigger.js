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
        rejectUnauthorized: true,
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

console.log('upcomingEvents Trigger has succesfully loaded.');

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD 
    }
});

// Function to send email notifications
const sendEventNotification = (event) => {
    const { email, title, startDate, building, floor, timeSlot } = event; 

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Upcoming Exhibition Notification',
        text: `Dear Customer, \n\nWe are excited to inform you about an upcoming exhibition: "${title}". \n\n Held During Date: ${startDate}\n Held in Location: ${building}, ${floor}\n During the Time Slot: ${timeSlot}\n\nWe hope to see you there!Have a Nice Day!\n\nBest regards,\nMuseum Fine Arts Houston`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending email to ${email}:`, error);
        } else {
            console.log(`Email sent to ${email}:`, info.response);
        }
    });
};

// Cron job runs every day at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running upcoming events check...');

    // Query to select upcoming events
    const query = `
        SELECT e.title, e.startDate, l.building, l.floor, t.timeSlot, c.email 
        FROM Exhibition e
        JOIN Location l ON e.locationId = l.locationId
        JOIN Ticket t ON e.exhibitionId = t.ticketID // Adjust based on your actual relations
        JOIN Customer c ON c.customerID = t.customerID // Adjust based on your actual relations
        WHERE e.startDate BETWEEN CURDATE() AND CURDATE() + INTERVAL 30 DAY;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return;
        }

        
        results.forEach(event => {
            sendEventNotification(event);
        });
    });
});

// USE THE FOLLOWING TO TEST
//const testEvent = {
//    email: 'test123@gmail.com', // Replace with your test email
//    title: 'Impressionist Art Exhibit',
//    startDate: '2024-10-25', // Example future date
//    building: 'Main Museum Hall',
//    floor: '2nd Floor',
//    timeSlot: '10:00 AM - 12:00 PM' // Example time slot
//};
//sendEventNotification(testEvent);