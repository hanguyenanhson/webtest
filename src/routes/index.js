const newsRouter = require('./newsRouter')
const loginRouter = require('./loginRouter')
const cartRouter = require('./cartRouter')
function route(app) {
    app.use(loginRouter)
    app.use(newsRouter)
    app.use(cartRouter)
}
module.exports = route