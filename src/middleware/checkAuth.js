import db from '../models'
import { AuthenticationError } from 'apollo-server-express';

export const attemptSignIn = async (email, password) => {
  const message = 'Wrong credentials. Please try again'
  const user = await db.Users.findOne({ email })

  if(!user) {
    throw new AuthenticationError(message)
  }

  if(!await user.matchesPassword(password)) {
    throw AuthenticationError(message)
  }

  return user
}


export const userSignOut = (req, res) => new Promise((resolve, reject) => {
  req.session.destroy(err => {
    if(err) reject(err)
    res.clearCookie(process.env.SESS_NAME)
    resolve(true)
  }
  )
})
