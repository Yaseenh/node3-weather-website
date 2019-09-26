const express = require('express');
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Mohammed Yaseen Hassan'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Mohammed Yaseen Hassan'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        helpText: 'This is some help text',
        name: 'Mohammed Yaseen Hassan'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address.',
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{

        if(error)
        {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast: forecastData.currentDataString,
                location,
                address: req.query.address
            })
        })
    })
})

// 404
app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name:'Mohammed Yaseen Hassan',
        errorMessage: 'Help article not found.'
    })
})

// Always last for unknown pages
app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name:'Mohammed Yaseen Hassan',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port 3000')
})