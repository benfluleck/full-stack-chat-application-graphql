import mongoose from 'mongoose'
import Joi from 'joi'

import db from '../../models'
import { signUp, signIn, objectId } from '../../validationSchemas';
import { attemptSignIn, userSignOut } from '../../middleware/checkAuth';


const userResolver = {
  Query: {
    checkUser: (root, args, { req }, info) => {

      return db.Users.findById(req.session.userId)

    },
    getAllUsers: (root, args, { req }, info) => {

      return db.Users.find({})
    },
    getUser: async (root, args, context, info) => {
      await Joi.validate(args, objectId)
      db.Users.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, context, info) => {
      await Joi.validate(args, signUp, { abortEarly: false })
      const createdUser = await db.Users.create(args)
      req.session.userId = createdUser.id
      return createdUser

    },
    signIn: async (root, args, { req }, info) => {
      await Joi.validate(args, signIn, { abortEarly: false })
      const userExists = await attemptSignIn(args.email, args.password)

      req.session.userId = userExists.id

      return userExists

    },
    signOut: async (root, args, { req, res }, info) => {
      return userSignOut(req, res)
    },
  },
  User: {
    chats: async (user, args, context, info) => {
     return (await user.populate('chats').execPopulate()).chats
    }
  }
}

export default userResolver;
