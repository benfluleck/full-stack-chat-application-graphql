import mongoose from 'mongoose'
import { hash, compare } from 'bcrypt'

const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: async email => await User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken`
    },
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    validate: {
      validator: username => User.doesntExist({ username }),
      message: ({ value }) => `Username ${value} has already been taken.` 
    },
  },
  avatarUrl: String,
  chats: {
    type: [Schema.Types.ObjectId],
    ref: 'Chat'
  }
}, {
    timestamps: true
  })

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)


export default User
