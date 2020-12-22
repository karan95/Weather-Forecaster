const _ = require('lodash');

/**
 * 
 * validate zipcode
 * @param {*} zipcode 
 */
const isValidZip = (zipcode) => {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
}

/**
 * 
 * format latitude, longitude by 4 decimal points
 * @param {*} num 
 */
const formatLocationCoordinate = (num) => {
    return Math.round(num * 10000) / 10000
}

/**
 * 
 * weather data formatter
 * @param {*} weatherObj
 * @param {*} contentType
 * @param {*} days @optional
 */
const weatherDataFormatter = (weatherObj, contentType, days) => {

    let weatherRes = {};
    weatherRes.location = _.pick(weatherObj.location, ['city', 'state', 'zip', 'geopoint']);
    weatherRes.periods = [];

    const currentDate = new Date().getDate();
    // additional check to get 7 days weather, default 3 days
    for (let WData of weatherObj.weeklyWeather.periods) {
        if (days === '7') {
            weatherRes.periods.push(_.pick(WData, ['name', 'startTime', 'endTime', 'temperature', 'temperatureUnit', 'windSpeed', 'windDirection', 'shortForecast']));
        } else {
            const wDate = new Date(WData.startTime).getUTCDate();
            if (currentDate + 2 >= wDate) {
                weatherRes.periods.push(_.pick(WData, ['name', 'startTime', 'endTime', 'temperature', 'temperatureUnit', 'windSpeed', 'windDirection', 'shortForecast']));
            }
        }
    }
    const currWeather = _.pick(weatherObj.currentWeather.current_observation, ['location', 'observation_time_rfc822', 'temperature_string', 'temp_f', 'wind_dir', 'wind_degrees', 'wind_mph', 'pressure_in',
        'relative_humidity', 'weather', 'windchill_f', 'precipitationLastHour_mi']);

    // return weather data in text format if Response return type is text otherwise default json
    if (contentType === 'text') {
        let weatherStr = `Weather forecast for ${weatherRes.location.city} ${weatherRes.location.state}, ${weatherRes.location.zip}:\n`;
        const obsTime = new Date(currWeather.observation_time_rfc822);

        const currentT = `  Current ${obsTime.toLocaleDateString()}, ${obsTime.toLocaleString('en-US', { hour: 'numeric', hour12: true })}`;
        const currentW = ((typeof currWeather.temp_f === 'string' && currWeather.temp_f.length > 0) ? currWeather.temp_f + ' F, ' : '')
            + 'wind ' + ((typeof currWeather.wind_mph === 'string' && currWeather.wind_mph.length > 0) ? currWeather.wind_mph + ' mph ' : '') + currWeather.wind_dir + ',';

        weatherStr += `${currentT.padEnd(25, ' ')} ${currentW.padEnd(29, ' ')} ${currWeather.weather}\n`;

        const currentWProp = `precipitation: ${(currentT.precipitationLastHour_mi) ? currentT.precipitationLastHour_mi : '0'},`.padEnd(21) + `humidity ${currWeather.relative_humidity}%`;
        const currentTProp = `windchill ${currWeather.windchill_f} F,`.padEnd(21) + `pressure ${currWeather.pressure_in} in`;
        weatherStr += `${''.padStart(36, ' ')}${currentWProp}\n${''.padStart(36, ' ')}${currentTProp}\n`

        for (let weather of weatherRes.periods) {
            const dayT = `${weather.name}, ${new Date(weather.startTime).toLocaleDateString().substring(0, 5)}:`;
            const windT = `${weather.temperature} ${weather.temperatureUnit}, wind ${weather.windSpeed} ${weather.windDirection},`;

            weatherStr += `  ${dayT.padEnd(25, ' ')} ${windT.padEnd(28, ' ')} ${weather.shortForecast}\n`;
        }
        return weatherStr;
    }
    weatherRes.currentWeather = currWeather;

    return weatherRes;
}


module.exports = {
    isValidZip,
    formatLocationCoordinate,
    weatherDataFormatter
}