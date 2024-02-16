const request = require('postman-request')

const geocode = (address, callback) => {
    const YOUR_API_KEY = "pk.eyJ1IjoiamVldDQ2OTAiLCJhIjoiY2xzN3M5emwwMjRwdDJpbzU1MGp4dHkzayJ9.uIcyROMUc9B0-B5wQ4Jq6g"
    const locURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token="+YOUR_API_KEY+"&limit=1"
    
    request({ url: locURL, json: true }, (error, {body}) => {

        if(error)
        {
            callback("Unable to connect", undefined)
        }else if(body.features.length == 0){
            
            callback("Invalid Location", undefined)

        }else{
            lng = body.features[0].center[0];
            lat = body.features[0].center[1];
            place = body.features[0].place_name;
            const coordinates = {
                latitude: lat,
                longitude: lng,
                place: place
            }

            console.log("Geocode file  :  " + coordinates.latitude);
            callback(undefined, coordinates)
        
        }
    });
}



module.exports = geocode