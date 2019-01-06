import gql from 'graphql-tag';

const chatSchema = gql`
  type Chat {
    id: ID!
    name: String
    users: [User!]!
    messages: [Message!]!
  }
`

export default chatSchema;
