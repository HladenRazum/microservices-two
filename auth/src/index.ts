import 'express-async-errors'
import mongoose from 'mongoose'
import express from 'express'
import { json } from 'body-parser'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)
app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDb')
  } catch (error) {
    console.log(error)
  }

  app.listen(3000, () => {
    console.log('Auth service is listening on port 3000')
  })
}

start()
