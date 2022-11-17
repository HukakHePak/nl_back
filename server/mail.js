const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_KEY,
    },
});

var func = (to, sub) => console.error('not sended before initial', to, sub);

const mailer = (...args) => func(...args);

transporter.verify((err, success) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Ready to send mail!');

        func = (to, subject, content) => {
            transporter.sendMail({
                from: process.env.MAIL_LOGIN, to, subject,
                html: content
            }, function (err, reply) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('mail sent', to, subject)
                }
            });
        }
    }
});

module.exports = mailer;
