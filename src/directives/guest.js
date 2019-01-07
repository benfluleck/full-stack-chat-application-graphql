import { SchemaDirectiveVisitor } from 'apollo-server-express'

import * as Auth from '../middleware/checkSession';


class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [, , context] = args
      Auth.ensureSignedOut(context.req)

      return resolve.apply(this, args)
    }
  }

}


export default GuestDirective
