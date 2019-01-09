import mongoose, { model } from 'mongoose';
const { Schema } = mongoose

const { ObjectId } = Schema.Types;

export default model('Message', new Schema({
  body: {
    type: String,
    required: true
  },
  sender: {
    type: ObjectId,
    ref: 'User'
  },
  chat: {
    type: ObjectId,
    ref: 'Chat'
  }
}, {
    timestamps: true
  }))
