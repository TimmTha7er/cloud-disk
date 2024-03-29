const { model, Schema } = require('mongoose')

const FileSchema = new Schema({
  name: { type: String, required: true },
  lowerName: { type: String },
  type: { type: String, required: true },
  size: { type: Number, default: 0 },
  path: { type: String, default: '' },
  date: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  parent: { type: Schema.Types.ObjectId, ref: 'File' },
  children: [{ type: Schema.Types.ObjectId, ref: 'File' }],
})

module.exports = model('File', FileSchema)
