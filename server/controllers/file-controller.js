const fileService = require('../services/file-service')

class FileController {
  async createDir(req, res, next) {
    try {
      const { name, type, parent } = req.body
      const filePath = req.filePath
      const userId = req.user.id
      const file = await fileService.createDir(
        name,
        type,
        parent,
        filePath,
        userId
      )

      return res.json(file)
    } catch (error) {
      next(error)
    }
  }

  async getFiles(req, res, next) {
    try {
      const { sort, parent } = req.query
      const userId = req.user.id
      const files = await fileService.getFiles(userId, parent, sort)

      return res.json(files)
    } catch (error) {
      next(error)
    }
  }

  async uploadFile(req, res, next) {
    try {
      const file = req.files.file
      const userId = req.user.id
      const parent = req.body.parent
      const dbFile = await fileService.uploadFile(file, userId, parent)

      res.json(dbFile)
    } catch (error) {
      next(error)
    }
  }

  async downloadFile(req, res, next) {
    try {
      const fileId = req.query.id
      const userId = req.user.id
      const filePath = req.filePath
     
      await fileService.downloadFile(filePath, res, fileId, userId)
    } catch (error) {
      next(error)
    }
  }

  async deleteFile(req, res, next) {
    try {
      const fileId = req.query.id
      const userId = req.user.id
      const filePath = req.filePath

      await fileService.deleteFile(filePath, fileId, userId)

      return res.json({ message: 'File was deleted' })
    } catch (error) {
      next(error)
    }
  }

  async searchFiles(req, res, next) {
    try {
      const searchName = req.query.search
      const userId = req.user.id
      const sortedFiles = await fileService.searchFiles(searchName, userId)

      return res.json(sortedFiles)
    } catch (error) {
      next(error)
    }
  }

  async uploadAvatar(req, res, next) {
    try {
      const file = req.files.file
      const userId = req.user.id
      const user = await fileService.uploadAvatar(file, userId)

      return res.json(user)
    } catch (error) {
      next(error)
    }
  }

  async deleteAvatar(req, res, next) {
    try {
      const userId = req.user.id
      const user = await fileService.deleteAvatar(userId)

      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FileController()
