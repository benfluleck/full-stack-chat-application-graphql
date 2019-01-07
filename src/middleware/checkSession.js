import { AuthenticationError } from "apollo-server-express";

const signedIn = req => req.session.userId

export const ensureSignedIn = req => {
  if(!signedIn(req)) {
    throw new AuthenticationError('You must be signed in')
  }
}

export const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in')
  }
}
