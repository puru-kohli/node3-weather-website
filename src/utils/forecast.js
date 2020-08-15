const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=104334645a2eee98a47c6bbb6c494a62&query=" + longitude + "," + latitude + "&units=f"
    request({url : url, json : true} , (error, response) => {
    if(error){
        callback('unable to connect to weather service', undefined)
    }else if(response.body.error){
        callback('unable to find location', undefined)
    }else{
        callback(undefined, response.body.current.weather_descriptions[0] + '. it is currently ' + response.body.current.temperature + ' degrees out. it feels like ' + response.body.current.feelslike + ' degrees out. Humidty is ' + response.body.current.humidity)
    }
})
}

module.exports = forecast