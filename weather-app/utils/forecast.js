const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url =  'https://api.weatherstack.com/current?access_key=c67efa439fb5814bc18052d031bae3a7&query=' + latitude + ',' + longitude + '&units=f'
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees, with a " + response.body.current.precip + " chance of rain.")
        } 
    })
}

module.exports = forecast