import mongoose, { model } from 'mongoose';
import User from './user';
const { Schema } = mongoose

const { ObjectId } = Schema.Types;

const chatSchema = new Schema({
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
  })


const USER_LIMIT = 5

chatSchema.pre('save', async function() {
  if (!this.title) {
    const users = await User.where('_id').in(this.users).limit(USER_LIMIT).select('name')
    const title = users.map(user => user.name).join(', ')

    if(this.users.length > USER_LIMIT) {
      title += '.... '
    }

    this.title = title
  }
})

export default mongoose.model('Chat', chatSchema);
