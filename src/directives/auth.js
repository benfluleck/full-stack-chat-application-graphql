import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

import * as Auth from '../middleware/checkSession';


class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [, , context] = args
      Auth.ensureSignedIn(context.req)

      return resolve.apply(this, args)
    }
  }
}


export default AuthDirective
