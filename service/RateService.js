'use strict';
const https = require('https');

const options = {
  hostname: 'api.coingecko.com',
  port: 443,
  path: '/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false',
  method: 'GET',
};

/**
 * Отримати поточний курс BTC до UAH
 * Запит має повертати поточний курс BTC до UAH використовуючи будь-який third party сервіс з публічним АРІ
 *
 * returns BigDecimal
 **/
exports.rate = function () {
  return new Promise(function (resolve, reject) {

    const req = https.request(options, res => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(`${JSON.parse(data)['market_data']['current_price']['uah']}`);
      });

    });

    req.on('error', error => {
      reject(error);
    });
    req.end();
  });
}

