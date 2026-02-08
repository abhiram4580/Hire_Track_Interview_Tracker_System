require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');

const logFile = 'email-test.log';

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(message);
    fs.appendFileSync(logFile, logMessage);
}

// Clear previous log
if (fs.existsSync(logFile)) {
    fs.unlinkSync(logFile);
}

const config = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
};

log('Starting email test script...');
log(`Attempting to send email with config: user=${config.auth.user}, passLength=${config.auth.pass ? config.auth.pass.length : 0}`);

const transporter = nodemailer.createTransport(config);

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to self
    subject: 'Test Email from Interview Tracker',
    text: 'If you receive this email, your notification service is configured correctly!',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        log(`Error sending email: ${error}`);
    } else {
        log(`Email sent successfully: ${info.response}`);
    }
});
