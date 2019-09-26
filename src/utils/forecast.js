const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/dc6fa9cc8e56e5b58d174cebf459702e/'+ latitude +','+ longitude+ '?units=si'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            // console.log('It is currently '+ currentData.temperature +' degrees out. There is a '
            // + currentData.precipProbability +'% chance of rain.' )
            const dataToReturn = 
            {
                currentData: body.currently,
                currentDataString: body.daily.data[0].summary + ' It is currently '+ body.currently.temperature +' degrees out. There is a '+ body.currently.precipProbability +'% chance of rain.'
                + ' Todays highest temperature is ' + body.daily.data[0].temperatureHigh + ' and lowest temperature is ' + body.daily.data[0].temperatureLow
                + '. Humidity is at ' + body.daily.data[0].humidity + ' and windspeed is '+ body.daily.data[0].windSpeed + '.' 
            }
            callback(undefined, dataToReturn)
        }
    })
}

module.exports = forecast