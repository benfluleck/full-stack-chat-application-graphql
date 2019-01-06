import mongoose from 'mongoose'
import { hash } from 'bcrypt'

const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: String,
  chats: {
    type: [Schema.Types.ObjectId],
    ref: 'Chat'
  }
}, {
    timestamps: true
  })

userSchema.pre('save', async function(){
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})


const User = mongoose.model('User', userSchema)


export default User
