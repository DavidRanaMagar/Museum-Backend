const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const nodemailer = require('nodemailer'); 
const mysql = require('mysql2'); 
const app = express();
const db = require('./models');

require('dotenv').config();


app.use(express.json());
app.use(cors());

// Import the credit card trigger
require('./triggers/creditCardTrigger');

//url encoded 
// app.use(express.urlencoded({ extended: true }));
app.use("/address", require("./routes/address"));
app.use("/artifacts", require("./routes/artifacts"));
app.use("/artifactStatus", require("./routes/artifactStatus"));
app.use("/category", require("./routes/category"));
app.use("/color", require("./routes/color"));
app.use("/customer", require("./routes/customer"));
app.use("/department", require("./routes/department"));
app.use("/donation", require("./routes/donation"));
app.use("/employee", require("./routes/employee"));
app.use("/employeeHours", require("./routes/employeeHours"));
app.use("/exhibition", require("./routes/exhibition"));
app.use("/giftShopItem", require("./routes/giftShopItem"));
app.use("/jobTitle", require("./routes/jobTitle"));
app.use("/loan", require("./routes/loan"));
app.use("/loanType", require("./routes/loanType"));
app.use("/location", require("./routes/location"));
app.use("/membership", require("./routes/membership"));
app.use("/membershipType", require("./routes/membershipType"));
app.use("/sale", require("./routes/sale"));
app.use("/sex", require("./routes/sex"));
app.use("/size", require("./routes/size"));
app.use("/ticket", require("./routes/ticket"));
app.use("/ticketStatus", require("./routes/ticketStatus"));
app.use("/ticketType", require("./routes/ticketType"));
app.use("/transaction", require("./routes/transaction"));
app.use("/user", require("./routes/user"));
app.use("/userRole", require("./routes/userRole"));


db.sequelize.sync().then(() => {
    app.listen(3001, '0.0.0.0', () => {
        console.log('Server is running on port 3001');
    });
});


app.get('/', function (req, res) {
    res.send('Hello World')
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
