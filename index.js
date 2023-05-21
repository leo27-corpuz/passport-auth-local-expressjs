const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store);
const isLogin = require('./middleware/isLogin')
const sequelize = require('./config/connectDB')
require('./middleware/passport-local-strat')
// require('./models/User')
const app = express()
const sequelizeSessionStore = new SessionStore({
    db: sequelize,
});
app.use(express.urlencoded({extended: true})) //form request
app.use(express.json()) //json request
app.use(cookieParser());
app.use(session({
    secret: "ASDASSADASDSDASDASDASDASDASREWRDQWEBVBX",
    resave: false,
    saveUninitialized: false,
     store: sequelizeSessionStore,
}))
app.use(passport.initialize())
app.use(passport.session())
//app routes
const authRoute = require('./routers/API/authRoute')
const userRoute = require('./routers/API/userRoute')
app.use('/api/auth', authRoute)
app.use('/api/user', isLogin, userRoute)

const port = 8000; // port number
app.listen(port, () => { // listen to the port and run
    console.log(`Running Express Server on Port ${port}`)
});