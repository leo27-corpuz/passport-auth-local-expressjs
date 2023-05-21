const asyncHandler = require('express-async-handler');
const User = require('../../models/User')

const getAllUser = asyncHandler (async (req, res) => {
    res.send('all users')
})
module.exports = { getAllUser }