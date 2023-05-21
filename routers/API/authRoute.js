const express = require('express') // require the express framework
const passport = require('passport')
const router = express.Router() // use the express router

const { login } = require('./../../controllers/API/AuthController');
router.route('/login').post(passport.authenticate('local'), login)
module.exports = router