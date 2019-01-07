import mongoose from 'mongoose'
import Joi from 'joi'

import { UserInputError } from 'apollo-server-express'
import db from '../../models'
import { signUp, signIn } from '../../validationSchemas';
import  * as Auth  from '../../middleware/checkSession';
import { attemptSignIn, userSignOut } from '../../middleware/checkAuth';


const userResolver = {
  Query: {
    checkUser: (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      return db.Users.findById(req.session.userId)

    },
    getAllUsers:(root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      return db.Users.find({})
    },
    getUser: (root, { id }, context, info) => {
      Auth.checkSignedIn(req)
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new UserInputError(`${id} is not a valid id`)
      }
      db.Users.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, {req}, context, info) => {

      await Joi.validate(args, signUp, { abortEarly: false })

      const createdUser = await db.Users.create(args)

      req.session.userId = createdUser.id

      return createdUser

    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session

      if(userId) {
        db.Users.findById(userId)
      }

      await Joi.validate(args, signIn, { abortEarly: false })

      const userExists = await attemptSignIn(args.email, args.password)

      req.session.userId = userExists.id

      return userExists

    },
    signOut: async(root, args, { req, res }, info) => {
      Auth.checkSignedIn(req)
      return userSignOut(req,res)

    }
  },

}

export default userResolver;
