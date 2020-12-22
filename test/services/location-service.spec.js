const LocationService = require('../../src/services/LocationService');

describe("LocationService Module", function () {

    it("getLocationByZipcode: should return location information by zip code", function (done) {
        const zip = '02210';
        LocationService.getLocationByZipcode(zip)
            .then(res => {
                res.should.be.a('array');
                const locationObj = res[0].fields;
                locationObj.should.have.property('city');
                locationObj.should.have.property('state').eql('MA');
                locationObj.should.have.property('latitude');
                locationObj.should.have.property('longitude');
                done();
            })
            .catch(err => {
                done(err);
            })
    });

});