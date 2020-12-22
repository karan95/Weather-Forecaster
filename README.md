# Welcome to Weather Forecast RESTful API:

### Table of contents
* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [API Usage Guide](#api-usage-guide)

### Overview:
- Welcome to weather forecast API. You can use this api to get current weather and weekly forecast details by zip code. 
- Data Source by National Weather Service: https://www.weather.gov/documentation/services-web-api

### Tech Stack:
- Development: Node.js + Express.js + MongoDB + Https + Nodemon
- Test: Mocha + Chai + Supertest

### Installation:
```
$ npm install
$ npm start
```
* Above commands will start an app on: http://localhost/3030

### Running Tests:
    $ npm test

### API Usage Guide:
---
- GET:: http://localhost:3030/weather/:zipcode
    - Params: `zipcode` (Any valid US zip code, currently supports MA zipcodes only) @Required
    - Query: `days` number of days, example:7, Default: 3 @optional
    - Accept: "text/plain", "application/json"(Default) @optional

#### Sample API Examples:
##### Request 1: 


    http://localhost:3030/weather/01854

    Request Type: 'GET', Headers - "Accept": "text/plain"
##### Response 1:
```
Weather forecast for Boston MA, 02210:
  Current 12/21/2020, 11 PM 36 F, wind 10.3 mph W,       Mostly Cloudy
                                    precipitation: 0,    humidity 73%
                                    windchill 28.5 F,    pressure 29.64 in
  Tonight, 12/21:           30 F, wind 8 mph W,          Patchy Fog then Mostly Cloudy
  Tuesday, 12/22:           40 F, wind 7 to 13 mph W,    Partly Sunny
  Tuesday Night, 12/22:     28 F, wind 12 mph W,         Mostly Clear
  Wednesday, 12/23:         37 F, wind 5 to 10 mph W,    Sunny
  Wednesday Night, 12/23:   32 F, wind 6 to 9 mph S,     Mostly Cloudy
  Thursday, 12/24:          56 F, wind 9 to 17 mph S,    Mostly Cloudy then Slight Chance Light Rain
  Thursday Night, 12/24:    47 F, wind 18 to 24 mph S,   Rain
```
---
##### Request 2: 


    http://localhost:3030/weather/01854

    Request Type: 'GET', Headers - "Accept": "application/json"

##### Response 2:
  ```json
{
    "location": {
        "city": "Lowell",
        "state": "MA",
        "zip": "01854",
        "geopoint": [
            42.649758,
            -71.33348
        ]
    },
    "periods": [
        {
            "name": "Tonight",
            "startTime": "2020-12-21T19:00:00-05:00",
            "endTime": "2020-12-22T06:00:00-05:00",
            "temperature": 25,
            "temperatureUnit": "F",
            "windSpeed": "3 mph",
            "windDirection": "W",
            "shortForecast": "Patchy Fog then Mostly Cloudy"
        },
        {
            "name": "Tuesday",
            "startTime": "2020-12-22T06:00:00-05:00",
            "endTime": "2020-12-22T18:00:00-05:00",
            "temperature": 40,
            "temperatureUnit": "F",
            "windSpeed": "2 to 10 mph",
            "windDirection": "W",
            "shortForecast": "Partly Sunny"
        },
        {
            "name": "Tuesday Night",
            "startTime": "2020-12-22T18:00:00-05:00",
            "endTime": "2020-12-23T06:00:00-05:00",
            "temperature": 24,
            "temperatureUnit": "F",
            "windSpeed": "6 to 9 mph",
            "windDirection": "W",
            "shortForecast": "Mostly Clear"
        },
        {
            "name": "Wednesday",
            "startTime": "2020-12-23T06:00:00-05:00",
            "endTime": "2020-12-23T18:00:00-05:00",
            "temperature": 37,
            "temperatureUnit": "F",
            "windSpeed": "2 to 6 mph",
            "windDirection": "SW",
            "shortForecast": "Sunny"
        },
        {
            "name": "Wednesday Night",
            "startTime": "2020-12-23T18:00:00-05:00",
            "endTime": "2020-12-24T06:00:00-05:00",
            "temperature": 28,
            "temperatureUnit": "F",
            "windSpeed": "3 mph",
            "windDirection": "S",
            "shortForecast": "Mostly Cloudy"
        },
        {
            "name": "Thursday",
            "startTime": "2020-12-24T06:00:00-05:00",
            "endTime": "2020-12-24T18:00:00-05:00",
            "temperature": 54,
            "temperatureUnit": "F",
            "windSpeed": "5 to 13 mph",
            "windDirection": "SE",
            "shortForecast": "Mostly Cloudy then Patchy Fog"
        },
        {
            "name": "Thursday Night",
            "startTime": "2020-12-24T18:00:00-05:00",
            "endTime": "2020-12-25T06:00:00-05:00",
            "temperature": 47,
            "temperatureUnit": "F",
            "windSpeed": "14 to 20 mph",
            "windDirection": "SE",
            "shortForecast": "Rain"
        }
    ],
    "currentWeather": {
        "location": "Lawrence, Lawrence Municipal Airport, MA",
        "observation_time_rfc822": "Tue, 22 Dec 20 03:54:00 +0000",
        "temperature_string": "34 F (1.1 C)",
        "temp_f": "34",
        "wind_dir": "WSW",
        "wind_degrees": "250",
        "wind_mph": "6.9",
        "pressure_in": "29.64",
        "relative_humidity": "88",
        "weather": "Clear",
        "windchill_f": "27.9"
    }
}
  ```
## Author
- [Karan Thakor](https://www.linkedin.com/in/karansinh-thakor/)
