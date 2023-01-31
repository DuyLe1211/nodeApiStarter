const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const app = express()
const mongoClient = require('mongoose')
const bodyParser = require('body-parser')

// setup connect mongodb
mongoClient.set('strictQuery', false)
mongoClient.connect('mongodb://127.0.0.1/nodejsapistarter')
    .then(() => {
        console.log('Connect Successfully!')
    })
    .catch((err) => {
        console.error(`Connect fail with error which is ${reportError}`)
    })

// Middlewares
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json())

// Routes
const route = require('./routes/index')
route(app)

// Catch 404 errors
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler function
app.use(() => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // response to client
    return res.status(status).json({
        error: {
            message: err.message
        }
    })
})

// Start the server
const port = app.get('port') || 3000
app.listen(port, () => {
    return console.log(`Server listening on port ${port}`)
})