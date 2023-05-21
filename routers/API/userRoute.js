const express = require('express') // require the express framework
const passport = require('passport')
const router = express.Router() // use the express router

const { getAllUser } = require('./../../controllers/API/UserController');
router.route('/').get(getAllUser)
module.exports = router