import Joi from './customObject'

export const objectId = Joi.object().keys({
  id: Joi.string().objectId().label('Object ID')
})
