import Joi from './customObject'

export const startChat = (userId) => Joi.object().keys({
  title: Joi.string().min(6).max(50).label('Title'),
  userIds: Joi.array().min(1).max(100).unique().items(
    Joi.string().objectId().not(userId).label('User Id')
  ).label('User IDS')
})
