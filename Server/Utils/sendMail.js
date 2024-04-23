const nodemailer = require('nodemailer');


const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
        
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (err) {
        console.log(err);
   }
    
};
module.exports = sendMail;
