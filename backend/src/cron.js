
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInterviewReminders = async () => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const upcomingInterviews = await prisma.application.findMany({
            where: {
                interviewDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                status: {
                  in: ['TECHNICAL_INTERVIEW', 'HR', 'ONLINE_TEST', 'SHORTLISTED'] 
                }
            },
            include: {
                user: true,
            },
        });

        if (upcomingInterviews.length > 0) {
            console.log(`Found ${upcomingInterviews.length} interviews for today.`);

            for (const application of upcomingInterviews) {
                const userEmail = application.user.email;
                const company = application.company;
                const role = application.role;

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: userEmail,
                    subject: `Interview Reminder: ${company} - ${role}`,
                    text: `Hello ${application.user.username},\n\nThis is a reminder that you have an interview scheduled for today with ${company} for the role of ${role}.\n\nGood luck!\n\nBest regards,\nSaas Interview Tracker System`,
                };

                try {
                    await transporter.sendMail(mailOptions);
                    console.log(`Email sent to ${userEmail}`);
                } catch (emailError) {
                    console.error(`Failed to send email to ${userEmail}:`, emailError);
                }
            }
        } else {
            console.log('No interviews scheduled for today.');
        }

    } catch (error) {
        console.error('Error in cron job:', error);
    }
};

// Schedule the task to run every day at 8:00 AM
cron.schedule('0 8 * * *', () => {
  console.log('Running daily interview reminder cron job...');
  sendInterviewReminders();
});

module.exports = { sendInterviewReminders }; 
