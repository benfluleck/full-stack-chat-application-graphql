import gql  from 'graphql-tag';

const userSchema =
gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatarUrl: String
    chats: [Chat!]!
  }
  extend type Query {
    getUser(id: ID!): User!
    getAllUsers:[User!]!
  }
  extend type Mutation {
    signUp(name: String!, email: String!, password: String!): User!
  }
`

export default userSchema;

