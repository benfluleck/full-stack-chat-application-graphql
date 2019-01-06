import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import db from '../../models'

import uniqid from 'uniqid';


const userResolver = {
  Query: {
    getAllUsers:(root, args, context, info) => {
      return db.Users.find({})
    },
    getUser: (root, {id}, context, info) => {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new UserInputError(`${id} is not a valid id`)
      }
      db.Users.findById(id)
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      return db.Users.create(args)

    }
  },

}

export default userResolver;
