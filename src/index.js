import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { mergeTypes } from 'merge-graphql-schemas';

import { typeDefs, resolvers } from './graphql';


dotenv.config();


(async () => {
  try {

    const app = express()
    const inProduction = process.env.NODE_ENV === 'production'
    const port = 4000 || process.env.PORT
    const schema = makeExecutableSchema({ typeDefs: mergeTypes(typeDefs, { all: true }), resolvers })

    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_DATABASE}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    )

    app.disable('x-powered-by')

    const server = new ApolloServer({
      schema,
      playground: !inProduction
    })

    await server.applyMiddleware({ app })

    app.listen({ port }, () => {
      console.log(`Server started http://localhost:${port}${server.graphqlPath}`)
    })
  } catch (error) {
    console.error(error)
  }
})()


