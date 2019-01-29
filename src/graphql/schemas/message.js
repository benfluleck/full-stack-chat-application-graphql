import { gql } from 'apollo-server-express';

const messageSchema =
gql`
  type Message {
    id: ID!
    body: String!
    sender: User!
    chat: Chat!
    createdAt: String!
    updatedAt: String!
  }
`
export default messageSchema;
