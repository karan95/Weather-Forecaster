const supertest = require("supertest");
const app = require("../../app");
const chai = require('chai');
const should = chai.should();
const { initDBConnection} = require('../../mongodb');

describe("Weather API Module: /weather/:zipcode", function () {
    before(function(done) {
        initDBConnection(done)
    })
    
    it("Weather server is up and running", function (done) {
        supertest(app)
            .get("/")
            .expect(200)
            .end(function (err, res) {
                console.log(res.text);
                if (err) done(err);
                done();
            });
    });

    it("should return 3 days weather data for a valid MA zipcode with default return data-type JSON", function (done) {
        const zipcode = '02210';
        supertest(app)
            .get(`/weather/${zipcode}`)
            .expect(200)
            .end(function (err, res) {
                // default: returns data for 3 days
                const weatherObj = res.body;
                weatherObj.should.be.a('object');
                weatherObj.should.have.property('location');
                weatherObj.should.have.property('periods');
                weatherObj.should.have.property('currentWeather');
                weatherObj.periods.should.be.a('array');
                weatherObj.location.should.have.property('zip').eql(zipcode);
                // first day period object validation
                const firstP = weatherObj.periods[0];
                firstP.should.have.property('name');
                firstP.should.have.property('temperature');
                firstP.should.have.property('temperatureUnit');
                firstP.should.have.property('startTime');
                // current weather object validation
                const currWeather = weatherObj.currentWeather;
                currWeather.should.have.property('location');
                currWeather.should.have.property('observation_time_rfc822');
                currWeather.should.have.property('temp_f');
                if (err) done(err);
                done();
            });
    });
    
    it("should return 3 days weather data in text format for a valid MA zipcode with headers value to 'Accept':'text/plain'", function (done) {
        const zipcode = '01803';
        supertest(app)
            .get(`/weather/${zipcode}`)
            .set('Accept', 'text/plain')
            .expect(200)
            .end(function (err, res) {
                const weatherText = res.text;
                weatherText.should.be.a('string');
                if (err) done(err);
                done();
            });
    });
    
    it("should return 7 days weather data with query params{days=7} for a valid MA zipcode", function (done) {
        const zipcode = '01803';
        supertest(app)
            .get(`/weather/${zipcode}?days=7`)
            .expect(200)
            .end(function (err, res) {
                // returns data for 7 days
                const weatherObj = res.body;
                weatherObj.should.be.a('object');
                weatherObj.should.have.property('location');
                weatherObj.should.have.property('periods');
                weatherObj.should.have.property('currentWeather');
                weatherObj.periods.length.should.be.above(13);
                if (err) done(err);
                done();
            });
    });
    
    it("should return error data for a inValid zipcode", function (done) {
        const invalidZip = 'weather';
        supertest(app)
            .get(`/weather/${invalidZip}`)
            .expect(400)
            .end(function (err, res) {
                const errObj = res.body;
                errObj.should.have.property('error').eql('Invalid Zipcode');
                errObj.should.have.property('errorMessage');
                if (err) done(err);
                done();
            });
    });
    
    it("should return error for non-MA zipcode", function (done) {
        const nonMAZip = '03060'; // Nashua, NH
        supertest(app)
            .get(`/weather/${nonMAZip}`)
            .expect(400)
            .end(function (err, res) {
                const errObj = res.body;
                errObj.should.have.property('errorMessage').eql('Please provide a valid Massachusetts zipcode.');
                if (err) done(err);
                done();
            });
    });
});