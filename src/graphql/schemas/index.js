
import { gql } from 'apollo-server-express';

import chatSchema from './chat';
import messageSchema from './message';
import userSchema from './user';

const base = gql`
  directive @auth on FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`

const typeDefs = [
  base,
  chatSchema,
  messageSchema,
  userSchema,
]

export default typeDefs;
