const request = require('request')

const forecast = ({longitude, latitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=85b68092b5cd607986ca38f2eab2938a&query=${longitude},${latitude}`;
    request({
        url: url,
        json: true
    }, (error, response) => {
        if(error){
            callback('Low level error', undefined);
        } else if(response.body.error){
            callback('Coordinate error', undefined);
        } else{
            callback(undefined, `Temperature is ${response.body.current.temperature}`);
        }
    })
}

module.exports = forecast;