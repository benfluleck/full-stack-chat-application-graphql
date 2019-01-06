import mongoose, { model } from 'mongoose';
const { Schema } = mongoose

export default model('Message', new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
    timestamps: true
  }))
