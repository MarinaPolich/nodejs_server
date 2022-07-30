'use strict';
var utils = require('../utils/writer.js');

const fs = require('fs');
var Rate = require('../service/RateService');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const fileName = 'subscribe_emails.txt';


/**
 * Відправити e-mail з поточним курсом на всі підписані електронні пошти.
 * Запит має отримувати актуальний курс BTC до UAH за допомогою third-party сервісу та відправляти його на всі електронні адреси, які були підписані раніше.  
 *
 * no response value expected for this operation
 **/
exports.sendEmails = function () {
  return new Promise(function (resolve, reject) {
    const data = fs.readFileSync(fileName, 'utf8');
    Rate.rate()
      .then(function(resp) {
        const msg = {
          to: data.trim().split('\r\n'),
          from: 'test@example.com',
          subject: 'Ціна на біткоїн',
          text: `Ціна на біткоїн складае ${resp} грн`,
          // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
          .send(msg)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error)
          })
      }).catch(function (error) {
        reject(error)
      });



  });
}


/**
 * Підписати емейл на отримання поточного курсу
 * Запит має перевірити, чи немає данної електронної адреси в поточній базі даних (файловій) і, в разі її відсутності, записувати її. Пізніше, за допомогою іншого запиту ми будемо відправляти лист на ті електронні адреси, які будуть в цій базі. 
 *
 * email String Електронна адреса, яку потрібно підписати
 * no response value expected for this operation
 **/
exports.subscribe = function (email) {
  return new Promise(function (resolve, reject) {
    const fileName = 'subscribe_emails.txt';
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName, 'utf8');
      if (data.split('\r\n').some(x => x == email)) {
        resolve(utils.respondWithCode(409, ''));
        return;
      }
    }

    fs.writeFile(fileName, `${email}\r\n`, { flag: 'a+' }, function (err) {
      if (err) return console.log(err);
      resolve();
    });



  });
}

