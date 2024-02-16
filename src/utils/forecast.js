const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const API_KEY = "05f9214abcc229e36aeec86f882a3738"
    const locURL = "http://api.weatherstack.com/current?access_key="+API_KEY+"&query="+latitude+","+longitude
    request({ url: locURL, json: true }, (error, {body}) => {

        if(error)
        {
            callback("Unable to connect", undefined)
        }else if(body.current == null){
            
            callback("Invalid Location", undefined)

        }else{
            const currTemp = body.current.temperature
            const feelTemp = body.current.precip
            const weatherDisc = body.current.weather_descriptions[0]
            const weatherData = {
                current: currTemp,
                feel: feelTemp,
                description: weatherDisc
            }
            callback(undefined, weatherData.description + " Is it currently " + weatherData.current +". Chances of rain is " + weatherData.feel )
        }
    });
}



module.exports = forecast