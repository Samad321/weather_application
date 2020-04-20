const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/5b22bc09997c9764499da2cbeca2e858/" + latitude + ',' + longitude
    //  const url = "https://api.darksky.net/forecast/5b22bc09997c9764499da2cbeca2e858/45,45?fbclid=IwAR2R0r6eTpf098GVsz1ALvRSyWS6g_57teQgo3e_sn5ia5Q07cwGv9LQ3V0"
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast