const fs = require('fs')
const path = require('path')

class FileService {
  createDir(req, file) {
    const filePath = this.getPath(req, file)

    return new Promise((resolve, reject) => {
      try {
        if (fs.existsSync(filePath)) {
          return reject({ message: 'File already exist' })
        }

        fs.mkdirSync(filePath)

        return resolve({ message: 'File was created' })
      } catch (error) {
        return reject({ message: 'File error' })
      }
    })
  }

  deleteFile(req, file) {
    const path = this.getPath(req, file)

    if (file.type === 'dir') {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }

  getPath(req, file) {
    return path.resolve(req.filePath, file.user.toString(), file.path.toString())
  }
}

module.exports = new FileService()
