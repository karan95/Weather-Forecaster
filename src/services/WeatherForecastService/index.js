'use strict';

const xmlParser = require('xml2json');

const HttpsClientService = require('../HttpsClientService');
const { formatLocationCoordinate } = require('../../helpers');

class WeatherForecastService {

    /**
    * Fetch Grid Location
    *
    * @param {*} latitude
    * @param {*} longitude
    */
    static getGridForLocation(latitude, longitude) {
        if (!latitude || !longitude) {
            return Promise.reject('Missing latitude and longitude parameters');
        }

        return HttpsClientService.request(`/points/${formatLocationCoordinate(latitude)},${formatLocationCoordinate(longitude)}`, 'GET')
    }

    /**
    * Fetch Weather information
    *
    * @param {*} latitude
    * @param {*} longitude
    * @param {*} days
    */
    static getWeatherForLocation(gridId, gridX, gridY) {
        if (!gridId || !gridX || !gridY) {
            return Promise.reject('Missing location grid parameters.');
        }

        return HttpsClientService.request(`/gridpoints/${gridId}/${gridX},${gridY}/forecast`, 'GET')
    }

    /**
    * Fetch weather stations
    *
    * @param {*} latitude
    * @param {*} longitude
    */
    static getStationsForGridpoints(gridId, gridX, gridY) {
        if (!gridId || !gridX || !gridY) {
            return Promise.reject('Missing location grid parameters.');
        }

        return HttpsClientService.request(`/gridpoints/${gridId}/${gridX},${gridY}/stations`, 'GET')
    }

    /**
    * Fetch current weather for station
    *
    * @param {*} stationId
    */
    static getCurrentWeatherForStation(stationId) {
        if (!stationId) {
            return Promise.reject('Missing station id parameters.');
        }

        return new Promise((resolve, reject) => {
            HttpsClientService.request(`/stations/${stationId}/observations/current`, 'GET', { acceptType: 'application/vnd.noaa.obs+xml' }).then(data => {
                resolve(xmlParser.toJson(data));
            })
                .catch(err => reject(new Error(err.message)));
        });
    }

}

module.exports = WeatherForecastService;
