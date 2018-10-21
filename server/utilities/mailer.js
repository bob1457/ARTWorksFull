var nodemailer = require('nodemailer');
var config = require('../config/config');

exports.sendMail = (req, res, next) => {

    var transporter = nodemailer.createTransport({
        /*service: config.mailsettings.service || 'gmail',
        auth: {
            user: config.mailsettings.username || 'bob.h.yuan@gmail.com',
            pass: config.mailsettings.password || '570924MBA'
            }*/
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'bob.h.yuan@gmail.com',
              pass: '570924MBA'
          }
    });
    
    var mailOptions = {
        from: 'admin@artwoks.com',
        to: 'bob.yuan@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>NodeJS Email</b>'
    };
    /*
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        console.log('Email sent from ' + mailOptions.from + 'to ' + mailOptions.to);
          return res.ok({
            status: 'ok',
            msg: 'Email sent from ' + mailOptions.from + 'to ' + mailOptions.to
          });
          
        }
        res.send('done');
    });
    // next;
    transporter.close();
    */
}





  /** Use sendmail without SMTP host 

  const options = {
    
        logger: {
          debug: console.log,
          info: console.info,
          warn: console.warn,
          error: console.error
        },
        silent: false,
        dkim: false,
        devPort: 1025, // Default: False
        devHost: 'localhost', // Default: localhost
        smtpPort: 2525, // Default: 25
        smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
      
  }
  var sendmail = require('sendmail')(options);

  exports.sendmail = (req, res, next) => {
    sendmail({
        from: 'no-reply@yourdomain.com',
        to: 'test@qq.com, test@sohu.com, test@163.com ',
        subject: 'test sendmail',
        html: 'Mail of test sendmail ',
      }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
  }
*/