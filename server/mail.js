const sendmail = require('sendmail')();

module.exports = (to, subject, content) => sendmail({
    from: 'no-reply@note-lawn.ru', to, subject,
    html: content
}, function(err, reply) {
    // console.log(err && err.stack);
    // console.dir(reply);
});