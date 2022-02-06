const fs = require('fs')
const path = require('path')

class FileService {
  createDir(file) {
    const filePath = path.resolve('files', file.user.toString(), file.path.toString())

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
}

module.exports = new FileService()
