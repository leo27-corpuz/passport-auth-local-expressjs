const isLogin = (req, res, next) => {
    if(req.user)  next()
    else res.send('unauthorized')
}
module.exports = isLogin