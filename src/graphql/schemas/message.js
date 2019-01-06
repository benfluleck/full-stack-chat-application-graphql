import gql from 'graphql-tag';

const messageSchema =
gql`
  type Message {
    id: ID!
    body: String!
    user: User!
  }
`
export default messageSchema;
