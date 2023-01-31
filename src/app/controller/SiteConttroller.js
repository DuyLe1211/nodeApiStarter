class SiteController {
    // [GET] /users
    index(req, res) {
        return res.status(200).json({
            message: 'Server is OK!'
        })
    }
}

module.exports = new SiteController