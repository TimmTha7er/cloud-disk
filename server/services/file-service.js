const fs = require('fs')
const path = require('path')
const Uuid = require('uuid')
const ApiError = require('../exceptions/api-error')

const File = require('../models/file-model')
const User = require('../models/user-model')
const FileDto = require('../dtos/file.dto')

class FileService {
  async createDir(name, type, parent, filePath, userId) {
    const file = new File({
      name,
      type,
      parent,
      user: userId,
    })
    const parentFile = await File.findOne({ _id: parent })

    if (!parentFile) {
      file.path = name
      await this.createFile(filePath, file)
    } else {
      file.path = path.join(parentFile.path, file.name)
      await this.createFile(filePath, file)
      parentFile.children.push(file._id)
      await parentFile.save()
    }

    await file.save()

    return new FileDto(file)
  }

  async getFiles(userId, parent, sort) {
    const files = await File.find({
      user: userId,
      parent: parent,
    }).sort({ [sort]: 1 })

    return files.map((file) => new FileDto(file))
  }

  async downloadFile(path, res, fileId, userId) {
    const file = await File.findOne({ _id: fileId, user: userId })
    const filePath = this.getPath(path, file)
    const isPathExists = fs.existsSync(filePath)

    if (!isPathExists) {
      throw ApiError.BadRequest(`Download error`)
    }

    res.download(filePath, file.name)
  }

  async deleteFile(filePath, fileId, userId) {
    const file = await File.findOne({ _id: fileId, user: userId })

    if (!file) {
      throw ApiError.BadRequest(`File "${filePath}" not found`)
    }

    const path = this.getPath(filePath, file)

    if (file.type === 'dir') {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }

    await file.remove()
  }

  async searchFiles(searchName, userId) {
    const files = await File.find({ user: userId })
    const sortedFiles = files.filter((file) =>
      file.name.toLowerCase().includes(searchName)
    )

    return sortedFiles.map((file) => new FileDto(file))
  }

  async uploadAvatar(file, userId) {
    const user = await User.findById(userId)
    const avatarName = Uuid.v4() + '.jpg'
    const filePath = path.resolve('static', avatarName)

    file.mv(filePath)
    user.avatar = avatarName

    return await user.save()
  }

  async deleteAvatar(userId) {
    const user = await User.findById(userId)
    const filePath = path.resolve('static', user.avatar)

    fs.unlinkSync(filePath)
    user.avatar = null

    return await user.save()
  }

  async createFile(filePath, file) {
    const path = this.getPath(filePath, file)

    if (fs.existsSync(path)) {
      throw ApiError.BadRequest(`File already exist`)
    }

    fs.mkdirSync(path)
  }

  async uploadFile(file, userId, parentId) {
    const parent = await File.findOne({
      user: userId,
      _id: parentId,
    })
    const user = await User.findOne({ _id: userId })

    if (user.usedSpace + file.size > user.diskSpace) {
      throw ApiError.BadRequest(`There no space on the disk`)
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
      throw ApiError.BadRequest(`File "${file.name}" already exist`)
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

    return new FileDto(dbFile)
  }

  getPath(filePath, file) {
    return path.resolve(filePath, file.user.toString(), file.path.toString())
  }
}

module.exports = new FileService()
