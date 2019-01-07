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
    getUser(id: ID!): User!
    getAllUsers:[User!]!
    checkUser: User
  }
  extend type Mutation {
    signUp(name: String!, username: String!, email: String!, password: String!): User!
    signIn(email: String!, password: String!): User
    signOut: Boolean!
  }
`

export default userSchema;

