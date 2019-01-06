import mongoose, { model } from 'mongoose';
const { Schema } = mongoose

export default model('Chat', new Schema({
  name: String,
  users: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  messages: {
    type: [Schema.Types.ObjectId],
    ref: 'Message'
  }
}, {
    timestamps: true
  }))
