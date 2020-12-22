'use strict';

const https = require('https');

class HttpsClientService {

    /**
    * Https client to make requests
    *
    * @param {*} path
    * @param {*} methodType 
    * @param {*} reqOptions 
    * 
    */
    static request(path, methodType, reqOptions) {

        const options = {
            hostname: 'api.weather.gov',
            port: 443,
            path: path,
            method: methodType,
            headers: {
                'User-Agent': 'weather-server/1.0.0, (kmthakor95@gmail.com)'
            }
        }
        if (reqOptions && reqOptions.acceptType) options.headers['accept'] = reqOptions.acceptType;

        return new Promise((resolve, reject) => {
            try {
                https.get(options, (response) => {
                    let body = ''
                    response.on('data', (chunk) => body += chunk)
                    response.on('end', () => resolve(body))
                }).on('error', reject)
            } catch (err) {
                reject(new Error(err.message));
            }
        });
    }

}

module.exports = HttpsClientService;
