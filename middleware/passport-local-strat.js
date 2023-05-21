const passport = require('passport')
const User = require('../models/User')
const { Strategy } = require('passport-local')
const { hashpassword, validatePassword} = require('../middleware/passwordUtils')
passport.serializeUser((user, done) => {
    console.log(`serialize the user`)
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser( async(id, done) => {
    console.log(`deserializeUser the user`)
    console.log(id)
    try {
        const user = await User.findByPk(id);
        if(!user) throw new Error('User not found')
        console.log(user)
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})

passport.use(
    new Strategy(
        {
            usernameField: 'email',
        }, async (email, password, done) => {
           if(!email || !password) throw new Error('Missing credentials')
           const userDB = await User.findOne({ where:{ email: email }})
           if(!userDB) throw new Error('User not found')
            const isValid = validatePassword(password, userDB.password)
            if(!isValid) throw new Error('Password Invalid')
            done(null, userDB)
        }
    )
);