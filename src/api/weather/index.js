'use strict';

const express = require('express');
const router = express.Router();

// Services
const LocationService = require('../../services/LocationService');
const WeatherForecastService = require('../../services/WeatherForecastService');
const weatherServiceErrMsg = 'Error fetching weather data from weather.gov service';

// helpers
const { isValidZip, weatherDataFormatter } = require('../../helpers');

// route path: /weather/:zipcode
router.get('/:zipcode', function (req, res, next) {

    let contentType;
    if (req.headers['accept'] === 'text/plain') {
        res.setHeader('content-type', 'text/plain');
        contentType = 'text';
    } else {
        res.setHeader('content-type', 'application/json');
    }
    const weatherObj = {};
    const queryParams = req.query;

    if (isValidZip(req.params.zipcode)) {
        // get latitude and longitude for zip code
        LocationService.getLocationByZipcode(req.params.zipcode)
            .then(locationData => {
                let location;
                if (locationData && locationData.length > 0) location = locationData[0];
                if (location && location.fields.state === 'MA') {
                    weatherObj.location = location.fields;
                    
                    // get grid points for latitude and longitude
                    return WeatherForecastService.getGridForLocation(location.fields.latitude, location.fields.longitude)
                } else {
                    const error = new Error('Please provide a valid Massachusetts zipcode.');
                    error.status = 400;
                    throw error;
                }
            })
            .then(gridData => {
                const gridObj = JSON.parse(gridData);
                weatherObj.gridData = gridObj.properties;

                // get weather forecast for grid points
                return WeatherForecastService.getWeatherForLocation(gridObj.properties.gridId, gridObj.properties.gridX, gridObj.properties.gridY)

            })
            .then(weatherData => {
                const wObj = JSON.parse(weatherData);
                weatherObj.weeklyWeather = wObj.properties;

                // get station office for grid points
                return WeatherForecastService.getStationsForGridpoints(weatherObj.gridData.gridId, weatherObj.gridData.gridX, weatherObj.gridData.gridY)
            })
            .then(stationData => {
                const stations = JSON.parse(stationData);
                const station = stations.features[0];

                // get latest weather information from station office
                return WeatherForecastService.getCurrentWeatherForStation(station.properties.stationIdentifier)
            })
            .then(currentWeather => {
                const currentWeatherObj = JSON.parse(currentWeather);
                weatherObj.currentWeather = currentWeatherObj;
                let numDays;
                if (queryParams && queryParams.days) numDays = queryParams.days;
                // format weather data and return
                res.status(200).send(weatherDataFormatter(weatherObj, contentType, numDays));
            })
            .catch((err) => {
                res.status(err.status || 500).json({ message: weatherServiceErrMsg, name: err.name, errorMessage: err.message });
            });

    } else
        res.status(400).send({ error: 'Invalid Zipcode', errorMessage: 'Please provide a valid zipcode.'});

});

module.exports = router;
