const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieWFzZWVuaCIsImEiOiJjazB6MXJneXkwbGh4M2pvN2lyaGlnNGliIn0.SCyr6WZpLPlM0C7Xqk2n8A&limit=1'
    request({url, json: true}, (error, {body})=>{
           if(error){
               callback('Unable to connect to location services!', undefined)
           }
           else if(body.features.length === 0){
               callback('Unable to find location. Try another search.', undefined)
           }
           else{
               const data = body.features[0]
               const dataToReturn = 
               {
                   latitude: data.center[1],
                   longitude: data.center[0],
                   location: data.place_name
               }
               callback(undefined, dataToReturn)
           }
       })
   }

   module.exports = geocode