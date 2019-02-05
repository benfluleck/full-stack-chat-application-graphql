import Joi from 'joi'

import { startChat } from '../../validationSchemas';
import db from '../../models';
import { UserInputError } from 'apollo-server-core';



const chatResolver = {
  Mutation: {
    startChat: async (root, args, { req }, info) => {
      const { userId } = req.session
      const { title, userIds } = args

      await Joi.validate(args, startChat(userId), { abortEarly: true })

      const idsFound = await db.Users.where('_id').in(userIds).countDocuments()

      if (idsFound !== userIds.length) {
        throw new UserInputError('One or more of the user Ids are invalid')
      }

      userIds.push(userId)

      const chat = await db.Chats.create({ title, users: userIds })

      await db.Users.updateMany({ _id: { '$in': userIds } }, {
        $push: { chats: chat }
      })
      return chat

    }
  },
  Chat: {
    messages: async (chat, args, context, info) => {
      return  (await db.Messages.find({ chat: chat.id }))
    },
    users: async (chat, args, context, info) => {
      return (await chat.populate('users').execPopulate()).users
    },
    lastMessage: async (chat, args, context, info) => {
      return (await chat.populate('lastMessage').execPopulate()).lastMessage
    }
  }
}

export default chatResolver;
