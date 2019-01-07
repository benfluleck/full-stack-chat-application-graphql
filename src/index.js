import express from 'express';
import session from 'express-session'
import connectRedis from 'connect-redis'
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import { mergeTypes } from 'merge-graphql-schemas';
import dotenv from 'dotenv';

import { typeDefs, resolvers } from './graphql';


(async () => {
  try {
    dotenv.config()

    const app = express()
    const inProduction = process.env.NODE_ENV === 'production'
    const port = 4000 || process.env.PORT
    const SESS_LIFETIME = 60 * 60 * 1000 * 2;
    const schema = makeExecutableSchema({ typeDefs: mergeTypes(typeDefs, { all: true }), resolvers })

    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_DATABASE}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    )

    const RedisStore = connectRedis(session)

    const store = new RedisStore({
      host: process.env.REDIS_HOST_URL || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      pass: process.env.REDIS_PASSWORD
    })

    app.use(session({
      store,
      name: process.env.SESS_NAME,
      secret: process.env.SESS_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: inProduction
      }
    }))

    app.disable('x-powered-by')

    const server = new ApolloServer({
      schema,
      cors: false,
      playground: inProduction ? false : {
        settings:{
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    await server.applyMiddleware({ app })

    app.listen({ port }, () => {
      console.log(`Server started http://localhost:${port}${server.graphqlPath}`)
    })
  } catch (error) {
    console.error(error)
  }
})()


