const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // for server configuration
const port = process.env.PORT || 3000

// Define paths for the Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //to go to templates directory that was previously called views
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') // hbs = handlebars.js
app.set('views', viewsPath) // set the views path correctly
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath)) // a way to customize the server
// static means its static, no matter how many page refreshes it does not change

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Efren Laris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Efren Laris'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text for your entertainment.',
        title: 'Help',
        name: 'Efren Laris'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//FOR PAGES ABOVE ^^^
//app.com - this is the domain, it's a single express server, this is the root route
//app.com/help rout 2
//app.com/about rout 3
//app.com/weather rout 4

app.get('/help/*', (req, res) => {
    res.render('404'), {
        title: '404',
        name: 'Efren Laris',
        errorMessage: 'Help article not found'
    }

})

// * <- wild card loop, "everythings a match". Match anything, used for error 404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Efren Laris',
        errorMessage: 'Page not found'
    })

})

app.listen(port, () => {
    console.log('Server is up on port' + port)
}) 
//used only once to start up the server. port is inside -> ()
// this takes a callback function for simply telling whomever started it 
// that it's up 
// control C in terminal to shutdown server
// localhost:3000 in browser to see site
// on changes, you must restart the server