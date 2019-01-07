import gql  from 'graphql-tag';

const userSchema =
gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    avatarUrl: String
    chats: [Chat!]!
  }
  extend type Query {
    getUser(id: ID!): User! @auth
    getAllUsers:[User!]! @auth
    checkUser: User @auth
  }
  extend type Mutation {
    signUp(name: String!, username: String!, email: String!, password: String!): User! @guest
    signIn(email: String!, password: String!): User @guest
    signOut: Boolean! @auth
  }
`

export default userSchema;

