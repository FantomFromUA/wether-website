const request = require('request')

const geocoding = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZmFudG9tNzc3IiwiYSI6ImNsajFkajFtNDB4Nmcza3Q4eHpoeXU5emcifQ.HvNVe90-zeRKfrUwj56Cpg";

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error){
            callback('Unable to connect to location services', undefined);
        } else if(response.body.features.length === 0){
            callback('Unable to find location.', undefined)
        } else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocoding;