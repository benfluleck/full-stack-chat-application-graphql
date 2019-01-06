
const { gql } = require('apollo-server-express')

import chatSchema from './chat';
import messageSchema from './message';
import userSchema from './user';

const base = gql`
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
