const userRouter = require('./user')
const siteRouter = require('./site')
const deckRouter = require('./deck')

function route(app) {
    app.use('/decks', deckRouter)
    app.use('/users', userRouter)
    app.use('/', siteRouter)
}

module.exports = route