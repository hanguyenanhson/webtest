const newsRouter = require('./newsRouter')
const loginRouter = require('./loginRouter')
function route(app) {
    app.use(loginRouter)
    app.use(newsRouter)
    

}
module.exports = route