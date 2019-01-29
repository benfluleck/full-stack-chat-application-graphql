import mongoose, { model } from 'mongoose';
const { Schema } = mongoose

const { ObjectId } = Schema.Types;

const chatSchema = model('Chat', new Schema({
  title: String,
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  lastMessage: {
    type: [ObjectId],
    ref: 'Message'
  },
  messages: {
    type: [ObjectId],
    ref: 'Message'
  }
}, {
    timestamps: true
  }))


export default chatSchema;
