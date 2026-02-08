const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (email, username) => {
  try {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to HireTrack!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #4F46E5;">Welcome to HireTrack, ${username}! 🚀</h2>
                <p>We're thrilled to have you on board. HireTrack is designed to help you organize your job search and land your dream role.</p>
                <p>Here's what you can do next:</p>
                <ul>
                    <li><strong>Track Applications:</strong> Add your active job applications to the board.</li>
                    <li><strong>Set Goals:</strong> Define your weekly targets for applications and interviews.</li>
                    <li><strong>Log Interviews:</strong> Keep track of your upcoming interviews and prep materials.</li>
                </ul>
                <p>Good luck with your interviews!</p>
                <p>Best regards,<br/>The HireTrack Team</p>
            </div>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to: ${email}`, info.response);
    return info;
  } catch (error) {
    console.error(`Error sending welcome email to ${email}:`, error);
    // Don't throw error to prevent blocking registration
  }
};

module.exports = {
  transporter, // Export for cron job
  sendWelcomeEmail,
};
