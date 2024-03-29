module.exports = class FileDto {
  id
  name
  lowerName
  type
  size
  path
  date
  user
  parent
  children

  constructor(model) {
    this.id = model._id
    this.name = model.name
    this.lowerName = model.lowerName
    this.type = model.type
    this.size = model.size
    this.path = model.path
    this.date = model.date
    this.user = model.user
    this.parent = model.parent
    this.children = model.children
  }
}
