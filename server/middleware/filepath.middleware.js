const path = require('path')

function filePath (req, res, next) {
    req.filePath = path.resolve('files')

    next()
}

module.exports = filePath
