const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHVydWsiLCJhIjoiY2tkaTc3YjR4MDI1aDJ5cXh3ZW5ic2U0OCJ9.Ykwq4RXkmpKF5QnO4kv2uA&limit=1'

    request({url : url , json : true }, (error ,response) => {
        if(error){
            callback('unable to connect to mapbox', undefined)
        }else if(response.body.features.length === 0){
            callback('no matching results', undefined)
        }else{
            callback(undefined, {
                longitude: response.body.features[0].center[1],
                latitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode