'use strict';

const getDbClient = require('../../../mongodb').getDbClient;

class LocationService {
    
    /**
    * Fetch Location information for zip code
    *
    * @param {*} zipcode
    */
   static getLocationByZipcode(zipcode) {

        const DB_Client = getDbClient();
        return new Promise((resolve, reject) => {
            try {

                DB_Client.collection('zipcodes').find({'fields.zip': zipcode}).toArray()
                    .then(response => resolve(response))
                    .catch(error => {
                        reject(error)
                    });

            } catch (err) {
                reject(new Error(err.message));
            }
        });
    }

}

module.exports = LocationService;
