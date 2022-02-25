const path = require('path')
const fs = require('fs')
const Uuid = require('uuid')

const fileService = require('../services/fileService')
const User = require('../models/User')
const File = require('../models/File')

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body
      const file = new File({
        name,
        type,
        parent,
        user: req.user.id,
      })
      const parentFile = await File.findOne({ _id: parent })

      if (!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = path.join(parentFile.path, file.name)
        await fileService.createDir(file)
        parentFile.children.push(file._id)
        await parentFile.save()
      }

      await file.save()
      return res.json(file)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async getFiles(req, res) {
    try {
      const { sort } = req.query

      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      }).sort({ [sort]: 1 })

      return res.json(files)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Can not get files' })
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file

      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      })
      const user = await User.findOne({ _id: req.user.id })

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: 'There no space on the disk' })
      }

      user.usedSpace = user.usedSpace + file.size

      let filePath
      if (parent) {
        filePath = path.resolve(
          'files',
          user._id.toString(),
          parent.path,
          file.name
        )
      } else {
        filePath = path.resolve('files', user._id.toString(), file.name)
      }

      if (fs.existsSync(filePath)) {
        return res.status(400).json({ message: 'File already exist' })
      }

      file.mv(filePath)

      const type = file.name.split('.').pop()

      filePath = file.name
      if (parent) {
        filePath = path.join(parent.path, file.name)
      }

      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent?._id,
        user: user._id,
      })

      await dbFile.save()
      await user.save()

      res.json(dbFile)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Upload error' })
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      const filePath = fileService.getPath(file)

      if (fs.existsSync(filePath)) {
        return res.download(filePath, file.name)
      }

      return res.status(400).json({ message: 'Download error' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Download error' })
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })

      console.log('file')

      if (!file) {
        return res.status(400).json({ message: 'file not found' })
      }

      fileService.deleteFile(file)
      await file.remove()

      return res.json({ message: 'File was deleted' })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Dir is not empty' })
    }
  }

  async searchFiles(req, res) {
    try {
      const searchName = req.query.search
      const files = await File.find({ user: req.user.id })
      const sortedFiles = files.filter((file) => file.name.includes(searchName))

      return res.json(sortedFiles)
    } catch (error) {
      return res.status(400).json({ message: 'Search error' })
    }
  }

  async uploadAvatar(req, res) {
    try {
      const file = req.files.file
      const user = await User.findById(req.user.id)
      const avatarName = Uuid.v4() + '.jpg'
      const filePath = path.resolve('static', avatarName)

      file.mv(filePath)
      user.avatar = avatarName
      await user.save()

      return res.json(user)
    } catch (error) {
      return res.status(400).json({ message: 'Upload avatar error' })
    }
  }

  async deleteAvatar(req, res) {
    try {
      const user = await User.findById(req.user.id)
      const filePath = path.resolve('static', user.avatar)

      fs.unlinkSync(filePath)
      user.avatar = null
      await user.save()

      return res.json(user)
    } catch (error) {
      return res.status(400).json({ message: 'Delete avatar error' })
    }
  }
}

module.exports = new FileController()
