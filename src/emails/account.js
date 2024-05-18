const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const sendgridAPIKey = process.env.SENDGRIDAPIKEY;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'testemailruss@gmail.com',
        subject: 'Thank you for joining!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}
const sendCancelationEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'testemailruss@gmail.com',
        subject: 'Thank you for using our service!',
        text: `Thank you for using our services ${name}. Let me know why you want to delete your account.`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}

