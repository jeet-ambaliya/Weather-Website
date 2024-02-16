
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const viewsPath = path.join(__dirname,'../templates/views') 
const partialsPath = path.join(__dirname,'../templates/partials') 



// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(path.join(__dirname,'../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        location:"Montreal",
        name:"Jeet"
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "Jiraya",
        name: "Jeet"
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "This is the help page title",
        name: "Jeet"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "Please provide a Valid Address"
        })
    }


    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {


        if(error)
        {
            return res.send({error})
        }else{
    
            forecast(longitude, latitude, (error, forecast) => {
                if(error)
                {
                    return res.send({error})

                }else{
                    res.send({
                        forecast: forecast,
                        place,
                        address:req.query.address
                    })
                }
              })
            
        }
    })

})


app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error: "Please provide a search term"
        })
    }
    res.send({
        products:[]
    })
})











app.get('/help/*',(req,res) => {

    res.render('404', {
        title:"Help 404",
        errorMessage: "Article not found",
        name:"Jeet"
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title:"Generic 404",
        errorMessage: "This is Generic error page",
        name:"Jeet"
    })
})

app.listen(3000, () => {
    console.log("Server Started at : 3000")
})