const asyncHandler = require('express-async-handler');
const User = require('../../models/User')

const login = asyncHandler(async (req, res) => {
    res.send('login')
})
module.exports = {login}