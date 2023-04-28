const newsRouter = require('./newsRoute')
const loginRouter = require('./loginRouter')
function route(app) {
    app.use(loginRouter)
    app.use(newsRouter)
    

}
module.exports = route