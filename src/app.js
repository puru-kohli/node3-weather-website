const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname , '../tempelates/views')
const partialsPath = path.join(__dirname , '../tempelates/partials')

//set handlebars engine and views loacation
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req, res) => {
    res.render('index', {
        title : 'weather app',
        name: 'puru kohli'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title: 'about me',
        name: 'puru kohli'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        message: 'help me',
        title: 'help',
        name: 'puru kohli'
    })
})

app.get('/weather' , (req , res) => {
    if(!req.query.address){
        return res.send({
            error: 'no address specified'})
    }

    geocode(req.query.address , (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })
    })
})

app.get('/products' , (req , res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product : []
    })
})

app.get('/help/*' , (req , res) => {
    res.render('404' , {
        message : 'help aritcle not found',
        title: '404 page',
        name : 'puru kohli'
    })
})

app.get('*' , (req , res) => {
    res.render('404' , {
        message : 'page not found',
        title: '404 page',
        name : 'puru kohli'
    })
})

app.listen(port , () => {
    console.log('server is up on port ' + port)
})