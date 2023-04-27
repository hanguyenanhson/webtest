const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const handlebars = require('express-handlebars')
const port = 3000
const route = require('./routes')
const db = require ('./model/db')
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'lol',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Cấu hình LocalStrategy
passport.use('login',new LocalStrategy(
  function(username, password, done) {
    // Tìm kiếm thông tin user trong cơ sở dữ liệu
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


db.connect()
app.use(morgan('combined'))
app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views', path.join(__dirname, 'resource/views'));
handlebars.partialsDir = 'partials';
console.log(path.join(__dirname, 'resource/views'))

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})