const nodemailer = require("nodemailer");

const options = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_KEY,
    },
};

const transporter = nodemailer.createTransport(options);

var send = (to, sub) => console.error('not send before initial', to, sub);

const mailer = (...args) => send(...args);

transporter.verify((err, success) => {
    if (err) {
        console.error('Mail init connection error.', err.response);
    } else {
        console.log('Ready to send mail!');

        send = (to, subject, content) => {
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
