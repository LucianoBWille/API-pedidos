const bodyParser = require('body-parser')
var config = require('../config')
var sendgrid = require('@sendgrid/mail')


exports.send = async (to, subject, body) => {
    sendgrid.setApiKey(config.sendgridKey)
    const msg = {
            to: to,
            from: 'zueiraskiller@gmail.com',
            subject: subject,
            text: body.replace('<strong>', '').replace('</strong>', ''),
            html: body
        }

    sendgrid
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((e) => {
            console.log(e)
        }); 
}
