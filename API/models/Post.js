const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageFile: {
    type: String, 
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: "User",
    require: true,
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
});

module.exports = mongoose.model('Post', postSchema);
