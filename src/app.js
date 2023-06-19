const path = require('node:path');
const express = require('express');
const hbs = require('hbs');
const geocoding = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Erik'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Erik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Erik',
        helpMessage: "This is a help page"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address must be provided"
        })
    }

    geocoding(req.query.address, (error, data) => {
        if(error){
            return res.send({error})
        }

        forecast(data, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                location: data.location,
                forecast: forecastData
            });
        })
    })

});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('error-page', {
        title: 'Error',
        name: 'Erik'
    })
})

app.listen(3000, () => {
    console.log('Server is upp on port 3000.');
});