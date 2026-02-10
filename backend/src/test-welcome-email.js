require('dotenv').config();
const { sendWelcomeEmail } = require('./utils/email');

const testWelcomeEmail = async () => {
    console.log('Testing Welcome Email...');
    const email = process.env.EMAIL_USER; // Send to self
    const username = 'TestUser';

    if (!email) {
        console.error('EMAIL_USER is not defined in .env');
        return;
    }

    console.log(`Sending welcome email to ${email}...`);
    
    try {
        await sendWelcomeEmail(email, username);
        console.log('Welcome email test completed successfully.');
    } catch (error) {
        console.error('Welcome email test failed:', error);
    }
};

testWelcomeEmail();
